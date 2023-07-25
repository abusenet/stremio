import { HandlerContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_request: Request, { params }: HandlerContext) {
    const result = { streams: [] };

    try {
      const url = new URL(params.id, import.meta.url);
      const movie = await fetch(url).then((r) => r.json());
      result.streams = movie.streams;
    } catch {
      console.error(error);
      // When the add-on is unable to provide streams for a particular video,
      // return an empty streams array to avoid error shown to the user.
    }

    return new Response(JSON.stringify(result, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  },
};
