import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { Card } from "../components/Card.tsx";

interface Catalog {
  id: string;
  name: string;
  type: string;
  metas: Meta[];
}

interface Meta {
  id: string;
  name: string;
  poster: string;
}

interface CatalogProps extends Catalog {
  url: string;
}

export default function Catalog(props: CatalogProps) {
  const catalog = useSignal(props);

  useEffect(async () => {
    const { id, type, name, url = `/catalog/${type}/${id}.json` } = props;
    const { metas } = await fetch(url).then((r) => r.json());
    catalog.value = {
      ...catalog.value,
      // Limits the number of metas based on original metas length.
      metas: metas.filter((meta, index) => index < props.metas.length),
    };

    return () => {
      // Optional: Any cleanup code
    };
  }, []);

  return (
    <section class="my-16 mx-8">
      <h2 class="text-3xl text-[#8fafffe6] mb-4">
        {catalog.value.name} -{" "}
        <span class="capitalize">{catalog.value.type}</span>
      </h2>

      <ul class="flex -mx-4">
        {catalog.value.metas.map(({ id, name, poster }) => (
          <li class="basis-[10%] p-4 transition hover:bg-[#484572]">
            <Card
              title={name}
              image={poster}
              url={`/stream/${catalog.value.type}/${id}`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
