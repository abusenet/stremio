import { PageProps } from "$fresh/server.ts";

export default function App({ Component, state }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Fresh StremIO Project</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <header class="flex items-center justify-between p-2 text-[#8fafffe6] bg-[#2a2843]">
          <a href="/" rel="home">
            <img
              class=""
              src="/logo.svg"
              width="35"
              height="35"
              alt="the fresh logo: a sliced lemon dripping with juice"
            />
          </a>

          <form class="justify-self-center flex items-center bg-[#3e3c62] rounded-full">
            <label class="">
              <input
                type="search"
                name="q"
                placeholder="Search..."
                class="py-2 pl-6 pr-2 bg-transparent rounded-full"
              />
              <span class="sr-only">Search Terms</span>
            </label>

            <button type="submit" class="rounded-full">
              <svg viewBox="0 0 1443 1024" class="m-2 w-6 h-6 fill-current">
                <path d="M1033.035 774.927h-105.111c-0.013 0-0.027 0-0.042 0-10.802 0-21.14-1.988-30.667-5.619l0.591 0.198c-15.423-5.707-27.932-16.268-35.965-29.798l-0.176-0.32c-2.484-3.967-4.719-8.539-6.464-13.345l-0.162-0.509c-3.048-7.589-4.817-16.388-4.819-25.599l-0-0.001c0.67-42.233 35.063-76.212 77.393-76.212 0.533 0 1.064 0.005 1.594 0.016l-0.079-0.001h144.264c0.863-0.033 1.877-0.052 2.896-0.052 7.433 0 14.63 1.008 21.462 2.896l-0.565-0.133c11.866 3.986 21.976 10.503 30.094 18.95l0.023 0.024c13.553 13.793 21.92 32.721 21.92 53.602 0 3.187-0.195 6.328-0.573 9.412l0.037-0.37c-0.198 1.162-0.312 2.5-0.312 3.864 0 6.594 2.649 12.569 6.94 16.92l-0.003-0.003c3.716 3.783 8.767 6.245 14.389 6.622l0.068 0.004c0.278 0.011 0.605 0.018 0.932 0.018 13.056 0 23.716-10.256 24.364-23.151l0.002-0.058c0.649-4.698 1.020-10.125 1.020-15.64 0-33.301-13.512-63.447-35.352-85.253l-0.001-0.001c-21.066-21.097-50.071-34.263-82.15-34.635l-0.071-0.001c-52.104 0-103.906 0-156.009 0-49.554 2.528-91.243 33.695-109.027 77.175l-0.3 0.83c-2.498 6.628-4.885 14.795-6.704 23.173l-0.223 1.222c-2.090 8.002-3.29 17.188-3.29 26.654s1.2 18.652 3.456 27.414l-0.166-0.76c-0.065 0.722-0.103 1.561-0.103 2.409s0.037 1.688 0.11 2.517l-0.008-0.107c0 2.711 2.108 5.722 3.313 8.433 0.933 2.58 1.948 4.765 3.126 6.846l-0.115-0.22 3.614 7.228c1.752 3.103 3.546 5.761 5.523 8.266l-0.102-0.134c1.236 2.097 2.429 3.867 3.716 5.561l-0.102-0.14c3.598 4.93 7.154 9.25 10.937 13.356l-0.094-0.104c0.859 1.159 1.853 2.153 2.974 2.985l0.038 0.027c18.807 19.502 44.944 31.827 73.961 32.525l0.129 0.002c40.056 1.506 80.113 0 120.471 0 0.263 0.011 0.571 0.017 0.881 0.017 9.895 0 18.303-6.362 21.359-15.218l0.048-0.159c1.655-2.99 2.629-6.556 2.629-10.35 0-4.964-1.668-9.539-4.474-13.194l0.038 0.051c-4.974-5.048-11.885-8.176-19.527-8.176-0.547 0-1.090 0.016-1.63 0.048l0.074-0.003z">
                </path>
                <path d="M1407.398 611.689l-3.012-3.012c-17.962-18.55-42.498-30.641-69.842-32.509l-0.332-0.018c-19.576-1.506-39.454 0-60.235 0s-42.767 0-64.151 0c-0.38-0.022-0.825-0.035-1.273-0.035-9.786 0-18.157 6.062-21.562 14.636l-0.055 0.157c-1.435 2.772-2.276 6.052-2.276 9.528 0 5.366 2.005 10.264 5.307 13.986l-0.019-0.022 1.506 1.807c5.195 4.38 11.964 7.042 19.355 7.042 0.926 0 1.843-0.042 2.748-0.124l-0.117 0.009h104.508c0.17-0.001 0.37-0.002 0.571-0.002 21.491 0 40.967 8.624 55.157 22.6l-0.010-0.010c13.214 13.239 21.385 31.515 21.385 51.699 0 0.142-0 0.284-0.001 0.426l0-0.022c-0.842 42.098-35.167 75.902-77.388 75.902-0.323 0-0.645-0.002-0.967-0.006l0.049 0h-145.468c-0.821 0.030-1.785 0.047-2.754 0.047-7.045 0-13.88-0.896-20.399-2.58l0.565 0.124c-12.291-3.615-22.831-9.967-31.328-18.378l0.006 0.006c-13.459-13.864-21.756-32.803-21.756-53.68 0-3.586 0.245-7.115 0.719-10.571l-0.045 0.401c0.377-1.787 0.592-3.84 0.592-5.943 0-6.983-2.376-13.411-6.365-18.519l0.050 0.067c-1.77-2.045-3.862-3.753-6.208-5.060l-0.116-0.060c-16.264-6.626-30.118 3.614-33.129 23.793-0.783 5.16-1.23 11.115-1.23 17.173 0 66.534 53.937 120.471 120.471 120.471 0.433 0 0.865-0.002 1.296-0.007l-0.066 0.001c49.995 0 99.991 0 150.588 0 50.623-0.695 93.946-31.236 113.227-74.793l0.317-0.802c6.184-13.844 9.785-30.001 9.785-46.998 0-34.274-14.642-65.128-38.013-86.649l-0.083-0.075z">
                </path>
                <path d="M992.075 865.882c-25.6 0-51.802 0-78.005 0-40.714-1.196-77.196-18.374-103.573-45.445l-0.031-0.032-3.614-3.915c-28.592-29.766-46.199-70.27-46.199-114.887 0-60.965 32.875-114.252 81.865-143.1l0.777-0.423c12.528-38.704 19.791-83.241 19.878-129.462l0-0.044c-1.371-237.151-193.936-428.869-431.278-428.869-238.192 0-431.285 193.093-431.285 431.285 0 237.342 191.718 429.907 428.738 431.277l0.131 0.001c0.118 0 0.258 0 0.397 0 88.033 0 169.923-26.302 238.24-71.477l-1.612 1.002 200.885 202.089c13.51 18.524 35.139 30.425 59.548 30.425 2.363 0 4.699-0.112 7.005-0.33l-0.295 0.023c1.429 0.081 3.101 0.127 4.784 0.127 35.359 0 65.974-20.311 80.814-49.902l0.237-0.521c7.55-11.025 12.058-24.651 12.058-39.33 0-20.085-8.438-38.2-21.963-50.992l-0.033-0.031zM433.694 736.376c-166.335 0-301.176-134.841-301.176-301.176v0-7.529c1.449-166.068 136.41-300.133 302.682-300.133 167.173 0 302.693 135.52 302.693 302.693 0 0.9-0.004 1.799-0.012 2.698l0.001-0.138c-1.855 167.126-137.013 302.072-304.044 303.585l-0.144 0.001z">
                </path>
              </svg>
            </button>
          </form>

          <nav>
            <a href="#">
              <svg viewBox="0 0 1016 1024" class="w-8 h-8 fill-current">
                <path d="M379.784 1.506l-316.235-1.506c-17.58 0.003-33.524 7.011-45.19 18.385l0.014-0.013c-11.345 11.55-18.354 27.393-18.372 44.872l-0 0.003 1.506 316.838c0.663 34.993 28.856 63.187 63.787 63.848l0.063 0.001c0.090 0 0.196 0.001 0.302 0.001 34.492 0 62.473-27.876 62.644-62.328l0-0.016v-253.591h252.386c0.271 0.004 0.59 0.007 0.91 0.007 34.598 0 62.645-28.047 62.645-62.645 0-0.32-0.002-0.639-0.007-0.958l0.001 0.048c-1.004-34.88-29.443-62.792-64.437-62.946l-0.015-0z">
                </path>
                <path d="M633.976 128.904h254.494v252.386c-0.004 0.269-0.007 0.586-0.007 0.904 0 34.598 28.047 62.645 62.645 62.645 0.002 0 0.005-0 0.007-0l-0 0c35.122-0.497 63.483-28.753 64.15-63.787l0.001-0.063v-316.838c0.019-0.581 0.030-1.264 0.030-1.95 0-16.946-6.54-32.364-17.233-43.869l0.037 0.040c-11.448-11.329-27.189-18.338-44.568-18.372l-0.007-0-317.139 1.506c-35.189 0.334-63.646 28.686-64.15 63.802l-0.001 0.048c-0.004 0.271-0.007 0.59-0.007 0.91 0 34.282 27.538 62.133 61.7 62.638l0.048 0.001z">
                </path>
                <path d="M380.386 895.096h-252.386v-252.386c0.005-0.282 0.007-0.616 0.007-0.95 0-33.753-26.694-61.271-60.122-62.595l-0.12-0.004c-0.448-0.011-0.976-0.018-1.506-0.018-35.762 0-64.753 28.991-64.753 64.753 0 0.006 0 0.012 0 0.018l-0-0.001-1.506 316.838c-0.002 0.18-0.003 0.392-0.003 0.605 0 34.387 27.706 62.303 62.013 62.642l0.032 0h317.139c35.189-0.334 63.646-28.686 64.15-63.802l0.001-0.048c-0.142-35.138-27.992-63.725-62.825-65.050l-0.121-0.004z">
                </path>
                <path d="M950.814 580.066c-0.002-0-0.004-0-0.007-0-34.598 0-62.645 28.047-62.645 62.645 0 0.318 0.002 0.635 0.007 0.951l-0.001-0.048v252.386h-252.687c-0.18-0.002-0.392-0.003-0.605-0.003-34.387 0-62.303 27.706-62.642 62.013l-0 0.032c-0.007 0.359-0.011 0.783-0.011 1.207 0 35.554 28.655 64.416 64.13 64.75l0.032 0h316.536c17.385-0.034 33.126-7.043 44.58-18.377l-0.005 0.005c11.345-11.55 18.354-27.393 18.372-44.872l0-0.003v-316.838c-0.677-35.406-29.538-63.849-65.043-63.849-0.004 0-0.008 0-0.012 0l0.001-0z">
                </path>
              </svg>
            </a>
          </nav>
        </header>

        <main class="relative flex flex-wrap overflow-auto text-white bg-[#161523] h-[calc(100vh-56px)]">
          <Component />
        </main>

        <footer></footer>
      </body>
    </html>
  );
}
