import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";

import Catalog from "../../../islands/Catalog.tsx";

export const handler: Handlers<Catalog> = {
  async GET(request: Request, context: HandlerContext) {
    const { type, id } = context.params;
    let catalog;

    const manifests = [
      new URL("/manifest.json", request.url),
      "https://v3-cinemeta.strem.io/manifest.json",
    ];

    for await (const manifest of manifests) {
      const response = await fetch(manifest);
      const { catalogs } = await response.json();

      catalog = catalogs.find((catalog) => {
        return catalog.type === type && catalog.id === id;
      });

      if (catalog) {
        catalog.url = new URL(`/catalog/${type}/${id}.json`, response.url);
        break;
      }
    }

    return context.render(catalog);
  },
};

export default function CatalogPage(props: PageProps<Catalog>) {
  const catalog = props.data;

  return (
    <>
      <Head>
        <title>
          {catalog.name} - {catalog.type[0].toUpperCase()}
          {catalog.type.substring(1)}
        </title>
      </Head>

      <Catalog {...catalog} metas={[]} />
    </>
  );
}
