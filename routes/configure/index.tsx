import { Head } from "$fresh/runtime.ts";
import { FreshContext } from "$fresh/server.ts";

import Configurator from "$islands/Configurator.tsx";

export default function ConfigPage(request: Request, context: FreshContext) {
  const { host } = new URL(request.url);

  return (
    <>
      <Head>
        <title>Configure</title>
      </Head>

      <Configurator host={host} />
    </>
  );
}
