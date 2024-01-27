import { PageProps } from "$fresh/server.ts";

import type { User } from "$lib/db.ts";

import Nav from "$islands/Nav.tsx";

export default function App({ Component, state }: PageProps) {
  const user = state.user as User;

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Fresh StremIO Project</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="text-white/90 bg-gradient-to-r from-[#0c0b11] to-[#1a173e]">
        <header class="flex items-center justify-between p-2">
          <a href="/" rel="home">
            <img
              class=""
              src="/logo.svg"
              width="35"
              height="35"
              alt="the fresh logo: a sliced lemon dripping with juice"
            />
          </a>

          <form class="justify-self-center flex items-center bg-white/5 rounded-full">
            <label class="">
              <input
                type="search"
                name="q"
                placeholder="Search..."
                size={25}
                class="py-2 pl-6 pr-2 bg-transparent rounded-full"
              />
              <span class="sr-only">Search Terms</span>
            </label>

            <button type="submit" class="rounded-full">
              <svg viewBox="0 0 512 512" class="m-2 w-6 h-6 fill-current">
                <path d="M456.7 437.4000000000001l-94.1-94.1a173.252 173.252 0 0 0 34.8-104.6c0-96.3-78.4-174.7-174.7-174.7-96.3 0-174.7 78.4-174.7 174.8 0 96.3 78.4 174.7 174.7 174.7 37.71 0 74.406-12.21 104.6-34.8l94.1 94.1a24.962 24.962 0 0 0 12.646 6.09c4.711 0.78 9.546 0.19 13.934-1.69a24.985 24.985 0 0 0 10.823-8.94 24.978 24.978 0 0 0 4.297-13.36 25.93 25.93 0 0 0-6.4-17.5ZM97.9 238.79999999999973a124.684 124.684 0 0 1 112.406-124.12 124.74 124.74 0 0 1 86.498 23.9 124.691 124.691 0 0 1 48.045 75.79c6.052 30.36 0.599 61.87-15.298 88.43a124.7 124.7 0 0 1-70.715 55.25c-29.612 9-61.513 6.66-89.499-6.55a124.688 124.688 0 0 1-61.917-64.96 125.004 125.004 0 0 1-9.52-47.74Z"></path>
              </svg>
            </button>
          </form>

          <Nav user={user}></Nav>
        </header>

        <main class="relative">
          <Component />
        </main>

        <footer></footer>
      </body>
    </html>
  );
}
