import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Catalog from "./Catalog.tsx";

interface CatalogsProps {
  manifest: string;
  limit: number;
}

export default function Catalogs(props: CatalogsProps) {
  const catalogs = useSignal([]);
  const limit = props.limit || 10;

  useEffect(async () => {
    const response = await fetch(props.manifest);
    const manifest = await response.json();
    catalogs.value = manifest.catalogs.map((catalog) => {
      // Catalogs can be external, so we need to resolve the URL.
      catalog.url = new URL(
        `/catalog/${catalog.type}/${catalog.id}.json`,
        response.url,
      );
      return catalog;
    });

    return () => {
      // Optional: Any cleanup code
    };
  }, []);

  return (
    <>
      {catalogs.value.map((catalog) => (
        <Catalog {...catalog} metas={new Array(limit)} />
      ))}
    </>
  );
}
