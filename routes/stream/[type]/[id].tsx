import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";

import Meta from "$islands/Meta.tsx";
import Streams from "$islands/Streams.tsx";

export const handler: Handlers = {
  async GET(request: Request, context: HandlerContext) {
    const { type, id } = context.params;
    if (id.endsWith(".json")) {
      const result = { streams: [] };
      try {
        const url = new URL(`../${type}/${id}`, import.meta.url);
        const movie = await fetch(url).then((r) => r.json());
        result.streams = movie.streams;
      } catch (error) {
        console.error(error);
        // When the add-on is unable to provide streams for a particular video,
        // return an empty streams array to avoid error shown to the user.
      }

      return new Response(JSON.stringify(result, null, 2), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
    }

    return context.render();
  },
};

export default function StreamPage(props: PageProps) {
  const { type, id } = props.params;

  return (
    <>
      <Head>
        <title>{type} - {id}</title>
      </Head>

      <Meta type={type} id={id} />

      <aside class="relative bg-[#000000b3] basis-[26.5rem]">
        <Streams type={type} id={id} />
      </aside>
    </>
  );
}
