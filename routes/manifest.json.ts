/**
 * The add-on description and capabilities.
 */

import { Handlers } from "$fresh/server.ts";

import Manifest from "../lib/manifest.ts";

export const handler: Handlers = {
  async GET(request: Request, _context) {
    const { origin } = new URL(request.url);

    const manifest = await Manifest.fetch("/manifest.json", {
      id: "my.first.stremio.add-on",
      version: "1.0.0",
      name: "Fresh Add-on",
      description: "My Fresh Stremio add-on",
      logo: `${origin}/logo.svg`,
    });

    return new Response(JSON.stringify(manifest, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  },
};
