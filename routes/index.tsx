import { Head } from "$fresh/runtime.ts";
import Catalogs from "../islands/Catalogs.tsx";

export default function Home(request: Request, ctx: RouteContext) {
  return (
    <>
      <Head>
        <title>Board</title>
      </Head>

      <Catalogs></Catalogs>
    </>
  );
}
