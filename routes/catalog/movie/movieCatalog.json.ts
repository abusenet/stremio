import { Handlers } from "$fresh/server.ts";

export const name = "Hello, Movies";

export const handler: Handlers = {
  GET(_request: Request, _context) {
    const catalog = {
      "metas": [
        {
          "type": "movie",
          "id": "tt0032138",
          "name": "The Wizard of Oz",
          "poster": "https://images.metahub.space/poster/medium/tt0032138/img",
          "genres": ["Adventure", "Family", "Fantasy", "Musical"],
        },
        {
          "type": "movie",
          "id": "tt0017136",
          "name": "Metropolis",
          "poster": "https://images.metahub.space/poster/medium/tt0017136/img",
          "genres": ["Drama", "Sci-Fi"],
        },
      ],
    };

    return new Response(JSON.stringify(catalog, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  },
};
