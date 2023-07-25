/**
 * The add-on description and capabilities.
 */

import { Handlers } from "$fresh/server.ts";

const RESOURCES = ["catalog", "meta", "stream", "subtitles", "addon_catalog"];
const CONTENT_TYPES = ["movie", "series", "channel", "tv"];

export const handler: Handlers = {
  async GET(request: Request, _context) {
    const { origin } = new URL(request.url);
    const { routes } = (await import("../fresh.gen.ts")).default;

    const resources = [];
    const types = [];
    const catalogs = [];

    // Populates the manifest.
    Object.keys(routes).forEach((route) => {
      const [, , resource, type, filename, extra] = route.split("/");
      if (RESOURCES.includes(resource)) {
        if (!resources.includes(resource)) {
          resources.push(resource);
        }
        if (!CONTENT_TYPES.includes(type)) {
          return;
        }

        if (!types.includes(type)) {
          types.push(type);
        }

        if (resource === "catalog") {
          const id = filename.substring(0, filename.indexOf(".json"));
          if (extra) {
            let catalog = catalogs.find((catalog) => catalog.id === filename);
            if (!catalog) { // No actual catalog available.
              catalog = {
                id: filename,
                type,
              };
              catalogs.push(catalog);
            }

            const extras = catalog.extra || [];

            extras.push({
              name: extra.split("=", 1)[0],
              isRequired: false,
            });

            catalog.extra = extras;

            return;
          }

          catalogs.push({
            id,
            type,
            name: routes[route].name || id,
          });
        }
      }
    });

    const manifest = {
      id: "my.first.stremio.add-on",
      version: "1.0.0",
      name: "Fresh Add-on",
      description: "My Fresh Stremio add-on",
      logo: `${origin}/logo.svg`,
      resources,
      types,
      catalogs,
    };

    return new Response(JSON.stringify(manifest, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  },
};
