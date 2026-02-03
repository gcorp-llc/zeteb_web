import { Client } from "cassandra-driver";

const contactPoints = (process.env.SCYLLADB_CONTACT_POINTS || "localhost").split(",");
const localDataCenter = process.env.SCYLLADB_LOCAL_DATACENTER || "datacenter1";
const keyspace = process.env.SCYLLADB_KEYSPACE || "zeteb";

let client: Client | null = null;

export function getScyllaDBClient() {
  if (!client) {
    client = new Client({
      contactPoints,
      localDataCenter,
      keyspace,
      credentials: {
        username: process.env.SCYLLADB_USERNAME || "",
        password: process.env.SCYLLADB_PASSWORD || "",
      },
    });
  }
  return client;
}

export async function executeQuery(query: string, params: unknown[] = []) {
  const dbClient = getScyllaDBClient();
  return dbClient.execute(query, params, { prepare: true });
}
