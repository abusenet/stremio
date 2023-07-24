import { HandlerContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_request: Request, { params }: HandlerContext) {
    try {
      const { body } = await fetch(new URL(params.id, import.meta.url));
      return new Response(body, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
    } catch {
      // When the add-on is unable to provide streams for a particular video,
      // return an empty streams array to avoid error shown to the user.
      return Response.json({ streams: [] });
    }
  },
};
