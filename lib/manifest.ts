import manifest from "../fresh.gen.ts";

export enum Resource {
  AddonCatalog = "addon_catalog",
  Catalog = "catalog",
  Meta = "meta",
  Stream = "stream",
  Subtitles = "subtitles",
}

export enum ContentType {
  Movie = "movie",
  Series = "series",
  Channel = "channel",
  Tv = "tv",
}

export interface Catalog {
  id: string;
  name: string;
  type: string;
  metas: Meta[];
}

export interface Meta {
  id: string;
  name: string;
  poster: string;
  description?: string;
  logo?: string;
  runtime?: string;
  year?: number;
  genre?: string[];
}

export interface Manifest {
  id: string;
  version: string;
  name: string;
  description: string;
  logo: string;
  resources: Resource[];
  types: ContentType[];
  catalogs;
}

const RESOURCES = Object.values(Resource);
const CONTENT_TYPES = Object.values(ContentType);

export default class Manifest {
  static fetch(url: string, init: Partial<Manifest> = {}): Promise<Manifest> {
    if (url != "/manifest.json") {
      return fetch(url)
        .then((r) => r.json())
        .then((props) => new Manifest(props));
    }

    // const { routes } = (await import("../fresh.gen.ts")).default;
    const { routes } = manifest;

    const resources = [];
    const types = [];
    const catalogs = [];

    // Populates the manifest.
    Object.keys(routes).forEach((route) => {
      const [, , resource, type, filename, extra] = route.split("/");
      if (RESOURCES.includes(resource)) {
        if (!resources.includes(resource)) {
          resources.push(resource);
        }
        if (!CONTENT_TYPES.includes(type)) {
          return;
        }

        if (!types.includes(type)) {
          types.push(type);
        }

        if (resource === "catalog") {
          const id = filename.substring(0, filename.indexOf(".json"));
          if (extra) {
            let catalog = catalogs.find((catalog) => catalog.id === filename);
            if (!catalog) { // No actual catalog available.
              catalog = {
                id: filename,
                type,
              };
              catalogs.push(catalog);
            }

            const extras = catalog.extra || [];

            extras.push({
              name: extra.split("=", 1)[0],
              isRequired: false,
            });

            catalog.extra = extras;

            return;
          }

          catalogs.push({
            id,
            type,
            name: routes[route].name || id,
          });
        }
      }
    });

    return new Manifest({
      ...init,
      resources,
      types,
      catalogs,
    });
  }

  constructor(props: Partial<Manifest> = {}) {
    Object.assign(this, props);
  }
}
