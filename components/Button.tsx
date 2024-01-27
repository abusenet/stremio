import { JSX } from "preact";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      class="
        px-3 py-2
        text-center
        rounded-[3.5rem]
        outline outline-2 outline-white/90
        hover:bg-white/90 hover:text-[#0c0b11]
      "
    />
  );
}
