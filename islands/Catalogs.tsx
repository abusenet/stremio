import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Catalog from "./Catalog.tsx";

interface CatalogsProps {
  limit: number;
}

export default function Catalogs(props: CatalogsProps) {
  const catalogs = useSignal([]);

  useEffect(async () => {
    const manifest = await fetch("/manifest.json").then((r) => r.json());
    catalogs.value = manifest.catalogs;

    return () => {
      // Optional: Any cleanup code
    };
  }, []);

  return (
    <>
      {catalogs.value.map((catalog) => <Catalog {...catalog} metas={[]} />)}
    </>
  );
}
