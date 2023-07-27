import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";

import Manifest from "../../../lib/manifest.ts";

import Catalog from "../../../islands/Catalog.tsx";

export const handler: Handlers<Catalog> = {
  async GET(request: Request, context: HandlerContext) {
    const { type, id } = context.params;
    let catalog;

    const manifests = [
      "/manifest.json",
      "https://v3-cinemeta.strem.io/manifest.json",
    ];

    for await (const manifest of manifests) {
      const { catalogs } = await Manifest.fetch(manifest);

      catalog = catalogs.find((catalog) => {
        return catalog.type === type && catalog.id === id;
      });

      if (catalog) {
        const { href } = new URL(manifest, request.url);
        catalog.src = href.replace(
          "/manifest.json",
          `/catalog/${type}/${id}.json`,
        );
        break;
      }
    }

    return context.render(catalog);
  },
};

export default function CatalogPage(props: PageProps<Catalog>) {
  const { name, type, id, src } = props.data;

  return (
    <section class="my-16 mx-8">
      <Head>
        <title>
          {name} - {type[0].toUpperCase()}
          {type.substring(1)}
        </title>
      </Head>

      <Catalog src={src} />
    </section>
  );
}
