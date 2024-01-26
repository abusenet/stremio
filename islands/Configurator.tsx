import { useSignal } from "@preact/signals";

interface ConfiguratorProps {
  host: string;
}

export default function (props: ConfiguratorProps) {
  const configuration = useSignal("");

  return (
    <dialog open class="m-auto p-6 bg-transparent">
      <form class="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <label class="flex flex-col-reverse gap-2">
          <input
            name="configuration"
            type="password"
            size={50}
            class="p-3 bg-white/5 text-white/10 rounded-xl"
            onInput={(e: Event) => {
              configuration.value = (e.target as HTMLInputElement).value;
            }}
          />
          <span class="text-white/90">Configuration</span>
        </label>

        <a
          href={`stremio://${props.host}/${configuration}/manifest.json`}
          class="
            px-3 py-2
            text-white text-center
            rounded-[3.5rem]
            outline outline-2 outline-white/90
            hover:bg-white/90 hover:text-[#0c0b11]
          "
        >
          Install
        </a>
      </form>
    </dialog>
  );
}
