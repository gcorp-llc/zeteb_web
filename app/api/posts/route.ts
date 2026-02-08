import { auth } from "@/features/auth/lib/auth";
import { executeQuery } from "@/lib/db/scylladb";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let query = "SELECT * FROM post";
    let params: any[] = [];

    if (userId) {
      query += " WHERE user_id = ?";
      params.push(userId);
    }

    // Note: In real ScyllaDB, we might need paging state or sorting by timeuuid/timestamp
    // For now, simple select
    const result = await executeQuery(query, params);
    const posts = result.rows.map(row => ({
      ...row,
      created_at: row.created_at
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content, image_url } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const id = randomUUID();
    await executeQuery(
      "INSERT INTO post (id, user_id, content, image_url, created_at) VALUES (?, ?, ?, ?, toTimestamp(now()))",
      [id, session.user.id, content, image_url || null]
    );

    return NextResponse.json({ id, success: true });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
