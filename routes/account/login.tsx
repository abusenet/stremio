import { setCookie } from "$std/http/cookie.ts";

import { Head } from "$fresh/runtime.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import { Input } from "$components/Input.tsx";
import { Button } from "$components/Button.tsx";
import { login } from "$lib/db.ts";

interface Login {
  username: string;
  password: string;
  remember: boolean;
  error?: string;
}

export const handler: Handlers = {
  GET(request: Request, context: FreshContext) {
    return context.render({
      username: "",
      password: "",
      remember: false,
    });
  },
  async POST(request: Request, context: FreshContext) {
    const url = new URL(request.url);
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const remember = formData.has("remember");

    const session = await login(username, password);
    if (!session) {
      return context.render({
        error: "Invalid Login",
        username,
        password,
        remember,
      });
    }

    const headers = new Headers();
    setCookie(headers, {
      name: "session_id",
      value: session.id,
      maxAge: session.expireIn / 1000,
      sameSite: "Lax", // this is important to prevent CSRF attacks
      domain: url.hostname,
      path: "/",
      secure: true,
    });
    headers.set("Location", "/");

    return new Response(null, {
      status: 303, // "See Other"
      headers,
    });
  }
};

export default function RegisterPage(props: PageProps<Login>) {
  const { error, username, password, remember } = props.data;

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <dialog open class="m-auto p-6 text-white/90 bg-transparent">
        <form method="POST" class="flex flex-col gap-6">
          <p class="text-red-500">{error}</p>

          <Input
            name="username"
            type="text"
            title="Username"
            required={true}
            default={username}
            minlength={3}
            placeholder="Username"
            size={50}
          />
          <Input
            name="password"
            type="password"
            title="Password"
            required={true}
            default={password}
            minlength={8}
            placeholder="Password"
            size={50}
          />

          <Input
            name="remember"
            type="checkbox"
            title="Remember Me"
            default={remember ? "checked" : ""}
          />

          <Button type="submit">Login</Button>
        </form>
      </dialog>
    </>
  )
}
