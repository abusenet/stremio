import { Head } from "$fresh/runtime.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import { Input } from "$components/Input.tsx";
import { Button } from "$components/Button.tsx";
import { register } from "$lib/db.ts";

const USERNAME_PATTERN = /[a-z0-9]{3,}/;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

export const handler: Handlers = {
  async POST(request: Request, context: FreshContext) {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    // TODO: Make code required if needed.
    const code = formData.get("code") as string;

    // Simple server-side validation using the same patterns as the client.
    if (!USERNAME_PATTERN.test(username) || !PASSWORD_PATTERN.test(password)) {
      return context.render({
        error: "Invalid",
      }, {
        status: 400,
      });
    }

    await register(username, password, code);

    // Here we return a 204 No Content response always to avoid checking for
    // existing accounts.
    return new Response(`<p>
    Submitted. If the account was created successfully, you can now <a href="/account/login">login</a>.
    </p>`, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Location": "/account/login",
      },
    });
  }
};

export default function RegisterPage(props: PageProps) {
  const { searchParams } = props.url;

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <dialog open class="m-auto p-6 text-white/90 bg-transparent">
        <form method="POST" class="flex flex-col gap-6">
          <Input
            name="username"
            type="text"
            title="Username"
            default={searchParams.get("username") || ""}
            required={true}
            pattern={USERNAME_PATTERN.source}
            minlength={3}
            placeholder="3+ lowercase letters or numbers"
            size={50}
          />
          <Input
            name="password"
            type="password"
            title="Password"
            default={searchParams.get("password") || ""}
            required={true}
            pattern={PASSWORD_PATTERN.source}
            minlength={8}
            placeholder="8+ characters, at least 1 number, 1 lowercase and 1 uppercase"
            size={50}
          />
          <Input
            name="code"
            type="password"
            title="Invite/Promo Code"
            default={searchParams.get("code") || ""}
            placeholder="Invite/Promo Code"
            size={50}
          />

          <Button type="submit">Register</Button>
        </form>
      </dialog>
    </>
  )
}
