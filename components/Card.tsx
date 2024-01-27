interface CardProps {
  title: string;
  image?: string;
  url: string;
}

export function Card({ title, image, url }: CardProps) {
  return (
    <figure class="relative h-full flex flex-col">
      <div class="overflow-hidden rounded-xl group-hover:shadow-[0_0_0_0.2rem]">
        <img
          src={image} alt={"Image for " + title} loading="lazy"
          class="
            aspect-[2/3] object-cover opacity-90
            transition
            group-hover:scale-105
          "
        />
      </div>

      <figcaption class="my-auto py-2 text-white text-center">
        <a
          href={url}
          class="after:absolute after:inset-0"
        >
          {title}
        </a>
      </figcaption>
    </figure>
  );
}
