import { Head } from "$fresh/runtime.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

export default function AccountPage(props: PageProps) {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>

      <h1>Account</h1>
    </>
  )
}
