import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

import Catalog from "./Catalog.tsx";

interface CatalogsProps {
  manifest: string;
}

export default function (props: CatalogsProps) {
  const catalogs = useSignal([]);
  const limit = props.limit || 10;

  useEffect(async () => {
    const response = await fetch(props.manifest);
    const manifest = await response.json();
    catalogs.value = manifest.catalogs.map(({ id, type, name }) => {
      return {
        id,
        name,
        src: new URL(`/catalog/${type}/${id}.json`, response.url),
        type,
      };
    });

    return () => {
      // Optional: Any cleanup code
    };
  }, []);

  return (
    <>
      {catalogs.value.map(({ id, name, src, type }) => (
        <section class="m-6 basis-full">
          <h2 class="flex items-baseline text-3xl text-[#8fafffe6] mb-4">
            {name}&nbsp;-&nbsp;<span class="capitalize">{type}</span>

            <a
              href={`/catalog/${type}/${id.replace(".json", "")}`}
              class="ml-auto inline-flex items-center gap-2 text-xl uppercase"
            >
              See All
              <svg height="1em" viewBox="0 0 565 1024" class="fill-current">
                <path d="M84.932 14.155l465.016 463.511c8.963 8.73 14.578 20.859 14.757 34.301l0 0.033c-0.021 13.598-5.67 25.873-14.743 34.621l-0.015 0.014-464.113 463.209c-9.052 8.82-21.434 14.26-35.087 14.26s-26.035-5.44-35.098-14.27l0.011 0.010c-9.355-8.799-15.292-21.14-15.66-34.87l-0.001-0.066c-0.001-0.103-0.001-0.225-0.001-0.348 0-13.437 5.534-25.582 14.448-34.278l0.010-0.009 430.080-428.273-429.779-427.972c-9.101-8.684-14.76-20.907-14.76-34.451 0-0.171 0.001-0.341 0.003-0.511l-0 0.026c-0-0.043-0-0.094-0-0.145 0-13.595 5.526-25.899 14.455-34.789l0.002-0.002c9.099-8.838 21.532-14.287 35.238-14.287s26.138 5.449 35.25 14.299l-0.012-0.012z">
                </path>
              </svg>
            </a>
          </h2>

          <Catalog src={src} limit={10} />
        </section>
      ))}
    </>
  );
}
