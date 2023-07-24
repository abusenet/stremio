/**
 * The add-on description and capabilities.
 */

import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req: Request, _ctx) {
    const { origin } = new URL(req.url);

    const manifest = {
      "id": "my.first.stremio.add-on",
      "version": "1.0.0",
      "name": "Fresh Add-on",
      "description": "My Fresh Stremio add-on",
      "logo": `${origin}/logo.svg`,
      "resources": [],
      "types": [],
    };

    return new Response(JSON.stringify(manifest, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  },
};
