import { MiddlewareHandlerContext } from "$fresh/server.ts";

/**
 * CORS
 */
export async function handler(
  request: Request,
  context: MiddlewareHandlerContext,
) {
  const origin = request.headers.get("Origin") || "*";
  const allowMethods = "HEAD, GET, POST";

  if (request.method == "OPTIONS") {
    const resp = new Response(null, {
      status: 204,
    });
    const headers = resp.headers;
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", allowMethods);
    headers.set("Access-Control-Allow-Private-Network", "true");
    headers.set("Access-Control-Allow-Credentials", "true");
    return resp;
  }
  const resp = await context.next();
  const headers = resp.headers;

  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
  );
  headers.set("Access-Control-Allow-Methods", allowMethods);

  return resp;
}
