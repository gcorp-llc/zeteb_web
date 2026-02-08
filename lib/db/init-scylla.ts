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
    `CREATE INDEX IF NOT EXISTS verification_value_idx ON verification (value)`,

    // --- Extended Social Features ---

    // Follows
    `CREATE TABLE IF NOT EXISTS follow (
        follower_id text,
        following_id text,
        created_at timestamp,
        PRIMARY KEY (follower_id, following_id)
    )`,
    `CREATE INDEX IF NOT EXISTS follow_following_idx ON follow (following_id)`,

    // User Profile Details
    `CREATE TABLE IF NOT EXISTS user_profile (
        user_id text PRIMARY KEY,
        name text,
        bio text,
        cover_image text,
        specialty text,
        location text,
        timezone text,
        language text,
        analytics_views int,
        analytics_appointments int,
        education list<text>,
        experience list<text>,
        skills list<text>,
        addresses list<text>,
        endorsed_doctors list<text>,
        updated_at timestamp
    )`,

    // Posts
    `CREATE TABLE IF NOT EXISTS post (
        id text PRIMARY KEY,
        user_id text,
        content text,
        image_url text,
        created_at timestamp
    )`,
    `CREATE INDEX IF NOT EXISTS post_user_idx ON post (user_id)`,

    // Comments
    `CREATE TABLE IF NOT EXISTS comment (
        id text PRIMARY KEY,
        post_id text,
        user_id text,
        content text,
        created_at timestamp
    )`,
    `CREATE INDEX IF NOT EXISTS comment_post_idx ON comment (post_id)`,

    // Likes
    `CREATE TABLE IF NOT EXISTS like (
        target_id text,
        user_id text,
        target_type text,
        created_at timestamp,
        PRIMARY KEY (target_id, user_id)
    )`,

    // Notifications
    `CREATE TABLE IF NOT EXISTS notification (
        id text PRIMARY KEY,
        user_id text,
        type text,
        sender_id text,
        target_id text,
        content text,
        is_read boolean,
        created_at timestamp
    )`,
    `CREATE INDEX IF NOT EXISTS notification_user_idx ON notification (user_id)`,

    // Messages
    `CREATE TABLE IF NOT EXISTS message (
        id text PRIMARY KEY,
        sender_id text,
        receiver_id text,
        content text,
        file_url text,
        created_at timestamp
    )`,
    `CREATE INDEX IF NOT EXISTS message_sender_idx ON message (sender_id)`,
    `CREATE INDEX IF NOT EXISTS message_receiver_idx ON message (receiver_id)`,

    // Appointments
    `CREATE TABLE IF NOT EXISTS appointment (
        id text PRIMARY KEY,
        patient_id text,
        doctor_id text,
        date timestamp,
        status text,
        notes text,
        created_at timestamp
    )`,
    `CREATE INDEX IF NOT EXISTS appointment_patient_idx ON appointment (patient_id)`,
    `CREATE INDEX IF NOT EXISTS appointment_doctor_idx ON appointment (doctor_id)`
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
