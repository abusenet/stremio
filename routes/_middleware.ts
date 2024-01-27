import { getCookies } from "$std/http/cookie.ts";

import { FreshContext } from "$fresh/server.ts";

import { getUser } from "$lib/db.ts";

export const handler = [
  /**
   * CORS
   */
  async function cors(
    request: Request,
    context: FreshContext,
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
    const response = await context.next();
    const headers = response.headers;

    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
    );
    headers.set("Access-Control-Allow-Methods", allowMethods);

    return response;
  },

  /**
   * Authentication
   */
  async function auth(
    request: Request,
    context: FreshContext,
  ) {
    const cookies = getCookies(request.headers);
    const sessionId = cookies["session_id"];
    context.state.user = await getUser(sessionId);

    const response = await context.next();
    return response;
  }
];
