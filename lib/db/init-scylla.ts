import { executeQuery } from "./scylladb";

export async function initScyllaDB() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS user (
        id text PRIMARY KEY,
        name text,
        email text,
        "emailVerified" boolean,
        image text,
        "createdAt" timestamp,
        "updatedAt" timestamp,
        "phoneNumber" text,
        "phoneVerified" boolean
    )`,
    `CREATE INDEX IF NOT EXISTS user_email_idx ON user (email)`,
    `CREATE INDEX IF NOT EXISTS user_phone_idx ON user ("phoneNumber")`,

    `CREATE TABLE IF NOT EXISTS session (
        id text PRIMARY KEY,
        "userId" text,
        token text,
        "expiresAt" timestamp,
        "ipAddress" text,
        "userAgent" text,
        "createdAt" timestamp,
        "updatedAt" timestamp
    )`,
    `CREATE INDEX IF NOT EXISTS session_token_idx ON session (token)`,
    `CREATE INDEX IF NOT EXISTS session_userId_idx ON session ("userId")`,

    `CREATE TABLE IF NOT EXISTS account (
        id text PRIMARY KEY,
        "userId" text,
        "accountId" text,
        "providerId" text,
        "accessToken" text,
        "refreshToken" text,
        "accessTokenExpiresAt" timestamp,
        "refreshTokenExpiresAt" timestamp,
        scope text,
        "idToken" text,
        password text,
        "createdAt" timestamp,
        "updatedAt" timestamp
    )`,
    `CREATE INDEX IF NOT EXISTS account_userId_idx ON account ("userId")`,
    `CREATE INDEX IF NOT EXISTS account_provider_idx ON account ("providerId")`,
    `CREATE INDEX IF NOT EXISTS account_accountId_idx ON account ("accountId")`,

    `CREATE TABLE IF NOT EXISTS verification (
        id text PRIMARY KEY,
        identifier text,
        value text,
        "expiresAt" timestamp,
        "createdAt" timestamp,
        "updatedAt" timestamp
    )`,
    `CREATE INDEX IF NOT EXISTS verification_identifier_idx ON verification (identifier)`,
    `CREATE INDEX IF NOT EXISTS verification_value_idx ON verification (value)`
  ];

  for (const query of tables) {
    try {
      await executeQuery(query);
      console.log(`Executed: ${query.substring(0, 50)}...`);
    } catch (error) {
      console.error(`Error executing query: ${query.substring(0, 50)}...`, error);
    }
  }
}
