import { Head } from "$fresh/runtime.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { computed, signal } from "@preact/signals";

import Manifest from "$lib/manifest.ts";
import { Catalog } from "$lib/manifest.ts";

import Navigator from "$islands/Navigator.tsx";
import CatalogIsland from "$islands/Catalog.tsx";

interface Data {
  catalogs: Catalog[];
}

export const handler: Handlers = {
  async GET(request: Request, context: FreshContext) {
    const { type, id } = context.params;
    const allCatalogs: Catalog[] = [];

    const manifests = [
      "/manifest.json",
      "https://v3-cinemeta.strem.io/manifest.json",
    ];

    for await (const manifest of manifests) {
      const { href } = new URL(manifest, request.url);
      const { catalogs } = await Manifest.fetch(manifest);

      catalogs.forEach((catalog) => {
        allCatalogs.push(catalog);

        catalog.href = href.replace(
          "/manifest.json",
          `/catalog/${type}/${id}.json`,
        );
      });
    }

    return context.render({
      catalogs: allCatalogs,
      type,
      id,
    });
  },
};

export default function CatalogPage(props: PageProps<Data>) {
  const { type, id } = props.params;
  // All catalogs from all manifests
  const catalogs = signal(props.data.catalogs);
  // The catalog for this page
  const catalog = computed(() => {
    return catalogs.value.find((c) => c.type === type && c.id === id)!;
  });
  // Page title
  const title = computed(() => {
    const { name, type } = catalog.value;
    return `${name} - ${type[0].toUpperCase()}${type.substring(1)}`;
  });

  return (
    <section class="m-6">
      <Head>
        <title>{title}</title>
      </Head>

      <Navigator catalogs={catalogs} type={type} id={id} />

      <CatalogIsland href={catalog.value.href!} />
    </section>
  );
}
