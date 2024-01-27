import { Config } from "$lib/manifest.ts";

interface InputProps extends Config {
  pattern?: string;
  minlength?: number;
  maxlength?: number;
  placeholder?: string;
  size?: number;
  onInput?: (e: Event) => void;
}

export function Input(props: InputProps) {
  const { name, type, title, default: value, ...attrs } = props;

  return (
    <label class={`flex ${ type === "checkbox" ? "" : "flex-col-reverse"} gap-2`}>
      <input
        name={name}
        type={type}
        value={value}
        checked={type === "checkbox" && value === "checked"}
        {...attrs}
        class="p-3 bg-white/5 rounded-xl"
      />
      <span
        class={ attrs.required ? "after:content-['*'] after:text-red-500" : ""}
      >{title || name}</span>
    </label>
  )
}
