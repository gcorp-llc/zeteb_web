import { getScyllaDBClient } from "@/lib/db/scylladb";
import { DBAdapter, Where } from "@better-auth/core/db";

/**
 * Better-Auth Adapter for ScyllaDB / Cassandra.
 */
export const scyllaAdapter = {
    id: "scylladb",
    async create({ model, data }: { model: string; data: any }) {
        const fields = Object.keys(data);
        const placeholders = fields.map(() => "?").join(", ");
        const columns = fields.map(f => `"${f}"`).join(", ");
        const values = Object.values(data);

        const query = `INSERT INTO "${model}" (${columns}) VALUES (${placeholders})`;
        const client = getScyllaDBClient();
        await client.execute(query, values, { prepare: true });
        return data;
    },

    async findOne({ model, where }: { model: string; where: Where[] }) {
        const { clause, values } = transformWhere(where);
        const query = `SELECT * FROM "${model}" ${clause} LIMIT 1`;
        const client = getScyllaDBClient();
        const result = await client.execute(query, values, { prepare: true });
        return result.first() ? Object.fromEntries(Object.entries(result.first())) : null;
    },

    async findMany({ model, where, limit, sortBy, offset }: {
        model: string;
        where?: Where[];
        limit?: number;
        sortBy?: { field: string; direction: "asc" | "desc" };
        offset?: number;
    }) {
        let query = `SELECT * FROM "${model}"`;
        let values: any[] = [];
        if (where && where.length) {
            const transformed = transformWhere(where);
            query += ` ${transformed.clause}`;
            values = transformed.values;
        }

        if (sortBy) {
            // Note: ORDER BY in ScyllaDB requires clustering keys.
            // This might fail if the field is not a clustering key.
            // Better-Auth usually doesn't rely heavily on sorting for core auth.
            query += ` ORDER BY "${sortBy.field}" ${sortBy.direction.toUpperCase()}`;
        }

        if (limit) {
            query += ` LIMIT ${limit}`;
        }

        // Offset is not natively supported in CQL like in SQL (no OFFSET keyword).
        // Usually handled via paging state or fetching and slicing.
        // For auth, offset is rarely used.

        const client = getScyllaDBClient();
        const result = await client.execute(query, values, { prepare: true });
        let rows = result.rows.map(row => Object.fromEntries(Object.entries(row)));

        if (offset) {
            rows = rows.slice(offset);
        }

        return rows;
    },

    async update({ model, where, update }: { model: string; where: Where[]; update: any }) {
        const { clause, values: whereValues } = transformWhere(where);
        const updateFields = Object.keys(update);
        const setClause = updateFields.map(f => `"${f}" = ?`).join(", ");
        const updateValues = Object.values(update);

        const query = `UPDATE "${model}" SET ${setClause} ${clause}`;
        const client = getScyllaDBClient();
        await client.execute(query, [...updateValues, ...whereValues], { prepare: true });

        // Better-Auth expects the updated record back in some cases
        return this.findOne({ model, where });
    },

    async updateMany({ model, where, update }: { model: string; where: Where[]; update: any }) {
        const { clause, values: whereValues } = transformWhere(where);
        const updateFields = Object.keys(update);
        const setClause = updateFields.map(f => `"${f}" = ?`).join(", ");
        const updateValues = Object.values(update);

        const query = `UPDATE "${model}" SET ${setClause} ${clause}`;
        const client = getScyllaDBClient();
        const result = await client.execute(query, [...updateValues, ...whereValues], { prepare: true });
        return result.rowLength; // This is not quite right for updateMany in CQL, but it's a best effort.
    },

    async delete({ model, where }: { model: string; where: Where[] }) {
        const { clause, values } = transformWhere(where);
        const query = `DELETE FROM "${model}" ${clause}`;
        const client = getScyllaDBClient();
        await client.execute(query, values, { prepare: true });
    },

    async deleteMany({ model, where }: { model: string; where: Where[] }) {
        const { clause, values } = transformWhere(where);
        const query = `DELETE FROM "${model}" ${clause}`;
        const client = getScyllaDBClient();
        const result = await client.execute(query, values, { prepare: true });
        return result.rowLength;
    },

    async count({ model, where }: { model: string; where?: Where[] }) {
        let query = `SELECT COUNT(*) FROM "${model}"`;
        let values: any[] = [];
        if (where && where.length) {
            const transformed = transformWhere(where);
            query += ` ${transformed.clause}`;
            values = transformed.values;
        }
        const client = getScyllaDBClient();
        const result = await client.execute(query, values, { prepare: true });
        const firstRow = result.first();
        if (!firstRow) return 0;
        // In ScyllaDB COUNT(*) might return a column named 'count' or 'system.count'
        const countValue = firstRow['count'] || firstRow.get?.('count');
        return parseInt(countValue?.toString() || "0");
    },

    async transaction(callback: any) {
        // ScyllaDB does not support ACID transactions across multiple tables/partitions.
        // We fallback to sequential execution as per Better-Auth recommendation.
        return callback(this);
    }
};

function transformWhere(where: Where[]) {
    if (!where || !where.length) return { clause: "", values: [] };
    const clauses = where.map(w => {
        let operator = w.operator === "eq" || !w.operator ? "=" : w.operator;
        if (operator === "in") return `"${w.field}" IN ?`;
        if (operator === "ne") {
            // ScyllaDB doesn't support != directly in many cases, often needs ALLOW FILTERING
            return `"${w.field}" != ?`;
        }
        return `"${w.field}" ${operator} ?`;
    });

    // We append ALLOW FILTERING because Better-Auth might query on non-primary key columns
    // In a production environment, you should ensure proper indexing.
    return {
        clause: "WHERE " + clauses.join(" AND ") + " ALLOW FILTERING",
        values: where.map(w => w.value)
    };
}
