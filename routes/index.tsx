import { Head } from "$fresh/runtime.ts";
import Catalogs from "$islands/Catalogs.tsx";

export default function Home(request: Request, ctx: RouteContext) {
  return (
    <>
      <Head>
        <title>Board</title>
      </Head>

      <Catalogs manifest="https://v3-cinemeta.strem.io/manifest.json" />

      <Catalogs manifest="/manifest.json"></Catalogs>
    </>
  );
}
