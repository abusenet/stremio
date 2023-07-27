import { computed, Signal, signal } from "@preact/signals";

import { Catalog } from "$lib/manifest.ts";

interface NavigatorProps {
  catalogs: Signal<Catalog[]>;
  id: string;
  type: string;
}

export default function (props: NavigatorProps) {
  const { catalogs, id, type } = props;

  const types = computed(() => {
    const set = new Set();
    catalogs.value.forEach(({ type }) => set.add(type));
    return [...set];
  });
  const typedCatalogs = computed(() => {
    return catalogs.value.filter((catalog) => catalog.type === type);
  });

  function navigate(e: Event) {
    const { name, value } = e.target as HTMLSelectElement;
    if (name === "type") {
      window.location.href = `/catalog/${value}/top`;
      return;
    }
    if (name === "id") {
      window.location.href = `/catalog/${type}/${value}`;
    }
  }

  return (
    <form class="flex gap-4 my-6" onChange={navigate}>
      <label>
        <select name="type" class="p-4 text-[#8497cde6] bg-[#2a2843]">
          {types.value.map((option) => (
            <option
              value={option}
              selected={option === type}
            >
              {option[0].toUpperCase()}
              {option.substring(1)}
            </option>
          ))}
        </select>
      </label>

      <label>
        <select name="id" class="p-4 text-[#8497cde6] bg-[#2a2843]">
          {typedCatalogs.value.map((catalog) => (
            <option
              value={catalog.id}
              selected={catalog.id === id}
            >
              {catalog.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        <select name="genre" class="p-4 text-[#8497cde6] bg-[#2a2843]">
          <option value="">None</option>
        </select>
      </label>
    </form>
  );
}
