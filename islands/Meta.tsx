import { useEffect } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";

interface MetaProps {
  type: string;
  id: string;
}

export default function (props: MetaProps) {
  const { type, id } = props;
  const meta = useSignal({});

  useEffect(async () => {
    const response = await fetch(
      `https://v3-cinemeta.strem.io/meta/${type}/${id}.json`,
    );
    const result = await response.json();
    meta.value = result.meta;

    return () => {
      // Optional: Any cleanup code
    };
  }, [props.type, props.id]);

  return (
    <>
      <div class="
          absolute inset-0
          after:absolute after:inset-0 after:z-1 after:bg-[#161523b3]
        ">
        <img
          src={meta.value.background}
          class="w-full h-full object-cover object-left-top"
        />
      </div>

      <div class="relative flex-1 p-6">
        <div>
          <p>
            <img
              title={meta.value.name}
              src={meta.value.logo}
              class="h-32 object-contain object-center"
            />
          </p>

          <p class="mt-4 flex items-center gap-8 text-2xl">
            <span>{meta.value.runtime}</span>
            <span>{meta.value.year}</span>
          </p>
        </div>

        <div>
          <p class="mt-4 text-2xl">{meta.value.name}</p>
          <p class="mt-4 text-lg">{meta.value.description}</p>
        </div>

        <div>
          <p class="mt-4">
            <span class="block font-medium uppercase text-[#999999e6]">
              Genres
            </span>

            {meta.value.genre?.map((genre) => (
              <a
                href={`/catalog/${type}/top/?genre=${genre}`}
                class="
                  inline-block px-[0.5rem] py-[0.3rem]
                  mr-[0.5rem]
                  rounded-[2rem]
                  text-[#d9d9d9e6] bg-[#ffffff33]
                "
              >
                {genre}
              </a>
            ))}
          </p>

          <p class="mt-4">
            <span class="block font-medium uppercase text-[#999999e6]">
              Cast
            </span>

            {meta.value.cast?.map((cast) => (
              <a
                href={`/?search=${cast}`}
                class="
                  inline-block px-[0.5rem] py-[0.3rem]
                  mr-[0.5rem]
                  rounded-[2rem]
                  text-[#d9d9d9e6] bg-[#ffffff33]
                "
              >
                {cast}
              </a>
            ))}
          </p>

          <p class="mt-4">
            <span class="block font-medium uppercase text-[#999999e6]">
              Directors
            </span>

            {meta.value.director?.map((director) => (
              <a
                href={`/?search=${director}`}
                class="
                  inline-block px-[0.5rem] py-[0.3rem]
                  mr-[0.5rem]
                  rounded-[2rem]
                  text-[#d9d9d9e6] bg-[#ffffff33]
                "
              >
                {director}
              </a>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
