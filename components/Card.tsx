interface CardProps {
  title: string;
  image: string;
  url: string;
}

export function Card({ title, image, url }: CardProps) {
  return (
    <figure class="relative h-full flex flex-col">
      <img src={image} alt={"Image for " + title} loading="lazy" />

      <figcaption class="text-white mt-auto">
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
