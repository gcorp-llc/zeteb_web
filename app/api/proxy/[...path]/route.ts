import { NextRequest, NextResponse } from "next/server";

async function handleProxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    console.error("BACKEND_URL is not defined in environment variables");
    return NextResponse.json({ error: "Internal Server Error: Proxy configuration missing" }, { status: 500 });
  }

  const targetPath = path.join("/");
  const url = new URL(req.url);
  const searchParams = url.search;
  const targetUrl = `${backendUrl}/${targetPath}${searchParams}`;

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.set("X-Proxied-By", "Zeteb-Proxy");

  try {
    const body = req.method !== "GET" && req.method !== "HEAD" ? await req.blob() : undefined;

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: body,
      cache: "no-store",
    });

    const responseData = await response.blob();
    const responseHeaders = new Headers(response.headers);

    // Security headers and cleanup
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");
    responseHeaders.set("X-Proxied-From", backendUrl);

    return new NextResponse(responseData, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error to " + targetUrl + ":", error);
    return NextResponse.json({ error: "Bad Gateway: Proxy connection failed" }, { status: 502 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
export const OPTIONS = handleProxy;
export const HEAD = handleProxy;
