import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { computed, signal } from "@preact/signals";

import Manifest from "$lib/manifest.ts";

import Navigator from "$islands/Navigator.tsx";
import Catalog from "$islands/Catalog.tsx";

export const handler: Handlers = {
  async GET(request: Request, context: HandlerContext) {
    const { type, id } = context.params;
    const allCatalogs = [];

    const manifests = [
      "/manifest.json",
      "https://v3-cinemeta.strem.io/manifest.json",
    ];

    for await (const manifest of manifests) {
      const { href } = new URL(manifest, request.url);
      const { catalogs, types } = await Manifest.fetch(manifest);

      catalogs.forEach((catalog) => {
        allCatalogs.push(catalog);

        catalog.src = href.replace(
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

export default function CatalogPage(props: PageProps) {
  const { type, id } = props.params;
  // All catalogs from all manifests
  const catalogs = signal(props.data.catalogs);
  // The catalog for this page
  const catalog = computed(() => {
    return catalogs.value.find((c) => c.type === type && c.id === id);
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

      <Catalog src={catalog.value.src} />
    </section>
  );
}
