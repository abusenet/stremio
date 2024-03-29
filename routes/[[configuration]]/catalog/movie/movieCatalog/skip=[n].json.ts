import { FreshContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(request: Request, { params }: FreshContext) {
    const skip = Number(params.n);
    const { pathname } = new URL(request.url);
    const [, _resource, _type, id, _extra] = pathname.split("/", 5);

    const result = { metas: [] };

    try {
      const url = new URL(`../${id}.json`, import.meta.url);
      const catalog = await fetch(url).then((r) => r.json());
      result.metas = catalog.metas.slice(skip);
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
