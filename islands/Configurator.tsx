import { useSignal } from "@preact/signals";

import { Input } from "$components/Input.tsx";

interface ConfiguratorProps {
  host: string;
}

export default function (props: ConfiguratorProps) {
  const configuration = useSignal("");

  return (
    <dialog open class="m-auto p-6 text-white/90 bg-transparent">
      <form class="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          name="configuration"
          type="password"
          title="Configuration"
          required={true}
          placeholder="Configuration"
          size={50}
          onInput={(e: Event) => {
            configuration.value = (e.target as HTMLInputElement).value;
          }}
        />

        <a
          href={`stremio://${props.host}/${configuration}/manifest.json`}
          class="
            px-3 py-2
            text-center
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
