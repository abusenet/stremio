import { Handlers } from "$fresh/server.ts";

export const name = "Hello, Movies";

export const handler: Handlers = {
  async GET(request: Request, _context) {
    const { pathname } = new URL(request.url);
    const [, _resource, _type, id] = pathname.split("/", 4);

    const result = { metas: [] };

    try {
      const url = new URL(id, import.meta.url);
      const catalog = await fetch(url).then((r) => r.json());
      result.metas = catalog.metas;
    } catch (error) {
      console.error(error);
      // When the add-on is unable to provide metas for a particular search,
      // return an empty metas array to avoid error shown to the user.
    }

    return new Response(JSON.stringify(result, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  },
};
