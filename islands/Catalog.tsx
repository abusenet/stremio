import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

import { Catalog } from "$lib/manifest.ts";

import { Card } from "$components/Card.tsx";

interface CatalogProps {
  src: string;
  limit?: number;
}

export default function (props: CatalogProps) {
  const url = new URL(props.src);
  const [, _resource, type, id, extra] = url.pathname.split("/");
  const metas = useSignal([]);

  useEffect(async () => {
    const catalog: Catalog = await fetch(url).then((r) => r.json());
    metas.value = catalog.metas.slice(0, props.limit);

    return () => {
      // Optional: Any cleanup code
    };
  }, [props.src]);

  return (
    <ul class={`-mx-4 flex flex-wrap`}>
      {metas.value.map(({ id, name, poster }) => (
        <li class="basis-[10%] p-4 transition hover:bg-[#484572]">
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
