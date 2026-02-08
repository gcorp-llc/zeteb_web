import { auth } from "@/features/auth/lib/auth";
import { executeQuery } from "@/lib/db/scylladb";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await executeQuery(
      "SELECT * FROM user_profile WHERE user_id = ?",
      [session.user.id]
    );

    const profile = result.first();
    if (!profile) {
      // Return default profile or null
      return NextResponse.json({
        user_id: session.user.id,
        bio: "",
        location: "",
        education: [],
        skills: [],
        addresses: [],
        analytics_views: 0,
        analytics_appointments: 0,
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const fields = Object.keys(data);

    if (fields.length === 0) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const setClause = fields.map(f => `"${f}" = ?`).join(", ");
    const values = Object.values(data);

    // Check if profile exists
    const checkResult = await executeQuery(
      "SELECT user_id FROM user_profile WHERE user_id = ?",
      [session.user.id]
    );

    if (checkResult.first()) {
      await executeQuery(
        `UPDATE user_profile SET ${setClause}, updated_at = toTimestamp(now()) WHERE user_id = ?`,
        [...values, session.user.id]
      );
    } else {
      const columns = fields.map(f => `"${f}"`).join(", ");
      const placeholders = fields.map(() => "?").join(", ");
      await executeQuery(
        `INSERT INTO user_profile (user_id, ${columns}, updated_at) VALUES (?, ${placeholders}, toTimestamp(now()))`,
        [session.user.id, ...values]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
