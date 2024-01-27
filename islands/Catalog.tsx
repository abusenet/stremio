import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

import { Catalog, Meta } from "$lib/manifest.ts";

import { Card } from "$components/Card.tsx";

interface CatalogProps {
  href: string;
  limit?: number;
}

export default function (props: CatalogProps) {
  const url = new URL(props.href);
  const [, _resource, type, id, extra] = url.pathname.split("/");
  const metas = useSignal([] as Meta[]);

  useEffect(() => {
    fetch(url).then((r) => r.json()).then((catalog: Catalog) => {
      metas.value = catalog.metas.slice(0, props.limit);
    });

    return () => {
      // Optional: Any cleanup code
    };
  }, [props.href]);

  return (
    <ul
      class="
        -mx-4
        grid grid-flow-col
        overflow-x-auto snap-x snap-proximity no-scrollbar

        auto-cols-[33.33%]
        sm:auto-cols-[25%]
        md:auto-cols-[20%]
        lg:auto-cols-[16.66%]
        xl:auto-cols-[12.5%]
        2xl:auto-cols-[10%]
      "
    >
      {metas.value.map(({ id, name, poster }) => (
        <li class="p-4 transition group">
          <Card
            title={name}
            image={poster}
            url={`/stream/${type}/${id}`}
          />
        </li>
      ))}
    </ul>
  );
}
