import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  GET(request: Request) {
    const url = new URL(request.url);
    const headers = new Headers(request.headers);
    deleteCookie(headers, "session_id", {
      path: "/",
      domain: url.hostname,
    });

    headers.set("Location", "/");
    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
