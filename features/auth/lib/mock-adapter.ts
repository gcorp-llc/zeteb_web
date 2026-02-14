import { type Where } from "@better-auth/core/db/adapter";

/**
 * Mock Adapter for Better-Auth to work without a real database.
 * Useful for UI development and simulation.
 */
const storage: Record<string, any[]> = {
    user: [
        {
            id: "1",
            name: "کاربر آزمایشی",
            email: "test@example.com",
            emailVerified: true,
            image: "/favicon.png",
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ],
    session: [
        {
            id: "session-1",
            userId: "1",
            token: "fake-token",
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            createdAt: new Date(),
            updatedAt: new Date(),
            userAgent: "Mozilla/5.0",
            ipAddress: "127.0.0.1"
        }
    ],
    account: [],
    verification: []
};

export const mockAdapter = () => ({
    id: "mock-adapter",
    async create({ model, data }: { model: string; data: any }) {
        if (!storage[model]) storage[model] = [];
        storage[model].push(data);
        return data;
    },

    async findOne({ model, where }: { model: string; where: Where[] }) {
        const rows = storage[model] || [];
        const found = rows.find(row => {
            return where.every(w => {
                const val = row[w.field];
                const operator = w.operator || "eq";
                if (operator === "eq") return val === w.value;
                if (operator === "in") return Array.isArray(w.value) && w.value.includes(val);
                return false;
            });
        });
        return found || null;
    },

    async findMany({ model, where, limit, offset }: { model: string; where?: Where[]; limit?: number; offset?: number }) {
        let rows = storage[model] || [];
        if (where) {
            rows = rows.filter(row => {
                return where.every(w => {
                    const val = row[w.field];
                    const operator = w.operator || "eq";
                    if (operator === "eq") return val === w.value;
                    if (operator === "in") return Array.isArray(w.value) && w.value.includes(val);
                    return false;
                });
            });
        }
        if (offset) rows = rows.slice(offset);
        if (limit) rows = rows.slice(0, limit);
        return rows;
    },

    async update({ model, where, update }: { model: string; where: Where[]; update: any }) {
        const rows = storage[model] || [];
        const index = rows.findIndex(row => {
            return where.every(w => row[w.field] === w.value);
        });
        if (index !== -1) {
            storage[model][index] = { ...storage[model][index], ...update };
            return storage[model][index];
        }
        return null;
    },

    async delete({ model, where }: { model: string; where: Where[] }) {
        const rows = storage[model] || [];
        storage[model] = rows.filter(row => {
            return !where.every(w => row[w.field] === w.value);
        });
    },

    async count({ model, where }: { model: string; where?: Where[] }) {
        let rows = storage[model] || [];
        if (where) {
            rows = rows.filter(row => {
                return where.every(w => row[w.field] === w.value);
            });
        }
        return rows.length;
    }
});
