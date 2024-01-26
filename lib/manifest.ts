/**
 * @module Manifest
 *
 * @see https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/manifest.md
 */

import manifest from "../fresh.gen.ts";

interface Manifest {
  /**
   * Identifier, dot-separated, e.g. "com.stremio.filmon"
   */
  id: string;
  /**
   * Human readable name
   */
  name: string;
  /**
   * Human readable description
   */
  description: string;
  /**
   * Semantic version of the addon
   */
  version: string;
  /**
   * Array of objects or strings, supported resources - for example
   * `["catalog", "meta", "stream", "subtitles", "addon_catalog"], resources
   * can also be added as objects instead of strings, for additional details
   * on how they should be requested, example: `
   * { "name": "stream", "types": [ "movie" ], "idPrefixes": [ "tt" ] }`
   */
  resources: Resource[];
  /**
   * Supported types, from all the {@linkcode ContentTypes}
   */
  types: ContentType[];
  /**
   * Use this if you want your addon to be called only for specific content IDs.
   * For example, if you set this to `["yt_id:", "tt"]`, your addon will only
   * be called for id values that start with `yt_id:` or `tt`
   */
  idPrefixes?: string[];
  catalogs: Catalog[];
  /**
   * Background image for the addon; URL to png/jpg, at least 1024x786.
   */
  background?: string;
  /**
   * Logo icon, URL to png, monochrome, 256x256.
   */
  logo?: string;
  /**
   * Contact email for addon issues; used for the Report button in the app;
   * also, the Stremio team may reach you on this email for anything relating
   * your addon.
   */
  contactEmail?: string;
  behaviorHints?: {
    /**
     * If the addon includes adult content, default is false; used to provide
     * an adequate warning to the user.
     */
    adult?: boolean;
    /**
     * If the addon includes P2P content, such as BitTorrent, which may reveal
     * the user's IP to other streaming parties; used to provide an adequate
     * warning to the user.
     */
    p2p?: boolean;
    /**
     * Default is false, if the addon supports settings, will add a button next
     * to "Install" in Stremio that will point to the /configure path on the
     * addon's domain.
     */
    configurable?: boolean;
    /**
     * Default is false, if set to true the "Install" button will not show for
     * your addon in Stremio, instead a "Configure" button will show pointing
     * to the /configure path on the addon's domain.
     */
    configurationRequired?: boolean;
  };
}

const Resources = [
  "addon_catalog",
  "catalog",
  "meta",
  "stream",
  "subtitles",
] as const;

export type Resource = typeof Resources[number];

const ContentTypes = [
  /**
   * Has metadata like name, genre, description, director, actors, images, etc.
   */
  "movie",
  /**
   * Has all the metadata a movie has, plus an array of episodes.
   */
  "series",
  /**
   * Created to cover YouTube channels; has name, description and an array of
   * uploaded videos
   */
  "channel",
  /**
   * Has name, description, genre;
   * streams for tv should be live (without duration)
   */
  "tv",
] as const;

export type ContentType = typeof ContentTypes[number];

export interface Catalog {
  /**
   * The content type of the catalog
   */
  type: ContentType;
  /**
   * The id of the catalog, can be any unique string describing the catalog
   * (unique per addon, as an addon can have many catalogs)
   */
  id: string;
  /**
   * Human readable name of the catalog
   */
  name: string;
  /**
   * All extra properties related to this catalog
   */
  extra: Extra[];
  genres?: string[];
  metas: Meta[];
  href?: string;
}

export interface Extra {
  /**
   * The name of the property; this name will be used in the `extraProps`
   * argument itself
   */
  name: string;
  /**
   * Set to true if this property must always be passed
   */
  isRequired: boolean;
  /**
   * Possible values for this property; this is useful for things like genres,
   * where you need the user to select from a pre-set list of options
   */
  options?: string[];
  /**
   * The limit of values a user may select from the options list; default 1
   */
  optionsLimit?: number;
}

export interface Meta {
  /**
   * Universal identifier; you may use a prefix unique to your addon, for
   * example `yt_id:UCrDkAvwZum-UTjHmzDI2iIw`
   */
  id: string;
  /**
   * Name of the content
   */
  name: string;
  /**
   * Genre/categories of the content; e.g. `["Thriller", "Horror"]`.
   * (warning: this will soon be deprecated in favor of `links`)
   */
  genres?: string[];
  /**
   * URL to png of poster; accepted aspect ratios: 1:0.675 (IMDb poster type)
   * or 1:1 (square) ; you can use any resolution, as long as the file size is
   * below 100kb; below 50kb is recommended
   */
  poster?: string;
  /**
   * Can be square (1:1 aspect) or poster (1:0.675) or landscape (1:1.77).
   * If you don't pass this, poster is assumed.
   */
  posterShape?: "square" | "poster" | "landscape";
  /**
   * The background shown on the stremio detail page; heavily encouraged if you
   * want your content to look good; URL to PNG, max file size 500kb.
   */
  background?: string;
  /**
   * The logo shown on the stremio detail page; encouraged if you want your
   * content to look good; URL to PNG
   */
  logo?: string;
  /**
   * Few sentences describing your content
   */
  description?: string;
  /**
   * Year the content came out ; if it's `series` or `channel`, use a start and
   * end years split by a tide - e.g. `"2000-2014"`. If it's still running, use
   * a format like `"2000-"`
   */
  releaseInfo?: string;
  /**
   * Director names (warning: this will soon be deprecated in favor of `links`)
   */
  director?: string[];
  /**
   * Cast names (warning: this will soon be deprecated in favor of `links`)
   */
  cast?: string[];
  /**
   * IMDb rating, a number from 0.0 to 10.0 ; use if applicable
   */
  imdbRating?: string;
  /**
   * ISO 8601, initial release date;
   * for movies, this is the cinema debut, e.g. `"2010-12-06T05:00:00.000Z"`
   */
  released?: string;
  /**
   * Trailers.
   * (warning: this will soon be deprecated in favor of meta.trailers being an
   * array of Stream Objects)
   */
  trailers?: Array<{
    /**
     * YouTube Video ID
     */
    source: string;
    type: "Trailer" | "Clip";
  }>;
  links?: Link[];
  /**
   * Used for `channel` and `series`;
   * if you do not provide this (e.g. for `movie`), Stremio assumes this meta
   * item has one video, and it's ID is equal to the meta item `id`
   */
  videos?: Video[];
  /**
   * Human-readable expected runtime - e.g. "120m"
   */
  runtime?: string;
  /**
   * Spoken language
   */
  language?: string;
  /**
   * Official country of origin
   */
  country?: string;
  /**
   * Human-readable that describes all the significant awards
   */
  awards?: string;
  /**
   * URL to official website
   */
  website?: string;
  behaviorHints?: {
    /**
     * Set to a {@linkcode Video} Object id in order to open the Detail page
     * directly to that video's streams
     */
    defaultVideoId?: string;
  };
}

interface Link {
  /**
   * Human readable name for the link
   */
  name: string;
  /**
   * Any unique category name, links are grouped based on their category, some
   * recommended categories are: `actor`, `director`, `writer`, while the
   * following categories are reserved and should not be used: `imdb`, `share`,
   * `similar`
   */
  category: string;
  /**
   * An external URL or {@linkcode MetaLink}
   */
  url: string;
}

const MetaLinks = [
  /**
   * Opens the Search page with the set `${query}`
   */
  "stremio:///search?search=${query}",
  /**
   * Opens the Discover page for the addon that has `${transportUrl}` (URL to
   * an addon's {@linkcode Manifest}), with the {@linkcode Catalog} which has
   * the id `${catalogId}` and the type `${type}`, the `?${extra}` is optional
   * and refers to Catalog Extra Parameters that should be passed as a Query
   * String
   */
  "stremio:///discover/${transportUrl}/${type}/${catalogId}?${extra}",
  /**
   * Opens the Detail page for the {@linkcode Meta} Object with the id
   * `${id}` and the type `${type}`
   */
  "stremio:///detail/${type}/${id}",
  /**
   * Opens the Detail page with Streams open for the {@linkcode Video} with the
   * id `${videoId}` for the {@linkcode Meta} Object with the id `${id}`
   * and the type `${type}`
   */
  "stremio:///detail/${type}/${id}/${videoId}",
] as const;

export type MetaLink = typeof MetaLinks[number];

interface Video {
  /**
   * ID of the video
   */
  id: string;
  /**
   * Title of the video
   */
  title: string;
  /**
   * ISO 8601, publish date of the video; for episodes, this should be the
   * initial air date, e.g. `"2010-12-06T05:00:00.000Z"`
   */
  released: string;
  /**
   * URL to png of the video thumbnail, in the video's aspect ratio, max file
   * size 5kb
   */
  thumbnail?: string;
  /**
   * In case you can return links to streams while forming meta response, you
   * can pass and array of {@linkcode Stream} Objects to point the video
   * to a HTTP URL, BitTorrent, YouTube or any other stremio-supported
   * transport protocol; note that this is exclusive: passing `video.streams`
   * means that Stremio will not request any streams from other addons for that
   * video; if you return streams that way, it is still recommended to
   * implement the streams resource
   */
  streams?: Stream[];
  /**
   * Set to `true` to explicitly state that this video is available for
   * streaming, from your addon; no need to use this if you've passed streams
   */
  available?: boolean;
  /**
   * Episode number, if applicable
   */
  episode?: number;
  /**
   * Season number, if applicable
   */
  season?: number;
  /**
   * Trailers
   */
  trailers?: Stream[];
  /**
   * Video overview/summary
   */
  overview?: string;
}

/**
 * A Stream Object.
 *
 * One of `url`, `ytId`, `infoHash` or `externalUrl` must be passed to point to
 * the stream itself.
 */
export interface Stream {
  /**
   * Direct URL to a video stream - must be an MP4 through https; others video
   * formats over http/rtmp supported if you set `notWebReady`
   */
  url?: string;
  /**
   * YouTube video ID, plays using the built-in YouTube player
   */
  ytId?: string;
  /**
   * Info hash of a torrent file
   */
  infoHash?: string;
  /**
   * The index of the video file within the torrent (from `infoHas`h);
   * **if `fileIdx` is not specified, the largest file in the torrent will be
   * selected**
   */
  fileIdx?: number;
  /**
   * External URL to the video, which should be opened in a browser (webpage),
   * e.g. link to Netflix
   */
  externalUrl?: string | MetaLink | URL;
  /**
   * Name of the stream; usually used for stream quality
   */
  name?: string;
  /**
   * Description of the stream
   * (warning: this will soon be deprecated in favor of stream.description)
   */
  title?: string;
  /**
   * Description of the stream (previously `stream.title`)
   */
  description?: string;
  /**
   * Subtitles for this stream
   */
  subtitles?: Subtitle[];
  behaviorHints?: {
    /**
     * Array of ISO 3166-1 alpha-3 country codes in lowercase in which the
     * stream is accessible
     */
    countryWhitelist?: string[];
    /**
     * Applies if the protocol of the url is http(s); needs to be set to `true`
     * if the URL does not support https or is not an MP4 file
     */
    notWebReady?: boolean;
    /**
     * If defined, addons with the same `behaviorHints.bingeGroup` will be
     * chosen automatically for binge watching; this should be something that
     * identifies the stream's nature within your addon: for example, if your
     * addon is called "gobsAddon", and the stream is 720p, the `bingeGroup`
     * should be "gobsAddon-720p"; if the next episode has a stream with the
     * same `bingeGroup`, stremio should select that stream implicitly.
     */
    bingeGroup?: string;
    /**
     * Only applies to `url`s; When using this property, you must also set
     * `stream.behaviorHints.notWebReady: true;`. This is an object containing
     * `request` and `response` which include the headers that should be used
     * for the stream (example value: `{"request": {"User-Agent": "Stremio"}}`)
     */
    proxyHeaders?: {
      request?: Record<string, string>;
      response?: Record<string, string>;
    };
  };
}

/**
 * A Subtitle Object.
 *
 * When creating subtitle addons, incorrectly encoded subtitles may be an
 * issue, in this case you can set the `url` response to
 * `http://127.0.0.1:11470/subtitles.vtt?from=` followed by the URL to the
 * subtitle file, this will force the local streaming server to guess the
 * subtitle encoding when loading it.
 *
 * You can also link to subtitle files from inside torrents, but you need to
 * know the file index of the subtitle files from the torrent file list. An
 * example of a link pointing to a subtitle inside a torrent is
 * `http://127.0.0.1:11470/6366e0a6d44d49c8fa09c04669375c024e42bf7e/3`, where
 * `6366e0a6d44d49c8fa09c04669375c024e42bf7e` is the torrent infohash, and `3`
 * is the file index of the subtitle file in the torrent.
 *
 * When linking to subtitle files inside torrents it is recommended to use the
 * subtitles property from the {@linkcode Stream|Stream Object}.
 */
export interface Subtitle {
  /**
   * Unique identifier for each subtitle, if you have more than one subtitle
   * with the same language, the id will differentiate them
   */
  id: string;
  /**
   * URL to the subtitle file
   */
  url: string;
  /**
   * Language code for the subtitle, if a valid ISO 639-2 code is not sent, the
   * text of this value will be used instead
   */
  lang: string;
}

class Manifest implements Manifest {
  static async fetch(
    url: string,
    init: Partial<Manifest> = {},
  ): Promise<Manifest> {
    if (url != "/manifest.json") {
      const response = await fetch(url);
      return new Manifest(await response.json());
    }

    const { routes } = manifest;

    const resources: Resource[] = [];
    const types: ContentType[] = [];
    const catalogs: Catalog[] = [];

    // Populates the manifest.
    Object.keys(routes).forEach((route) => {
      const [, , _configuration, resource, type, filename, extra] = route.split("/");

      // TODO: Adjust resources based on `configuration`.

      if (includes(Resources, resource)) {
        if (!includes(resources, resource)) {
          resources.push(resource);
        }
        if (!includes(ContentTypes, type)) {
          return;
        }

        if (!includes(types, type)) {
          types.push(type);
        }

        if (resource === "catalog") {
          const id = filename.substring(0, filename.indexOf(".json"));
          // @ts-ignore route can export a `name` property.
          const name = routes[route].name || id;

          if (extra) {
            let catalog = catalogs.find((catalog) => catalog.id === filename);
            if (!catalog) { // No actual catalog available.
              catalog = {
                id: filename,
                type,
                name,
                metas: [],
                extra: [],
              };
              catalogs.push(catalog);
            }

            const extras = catalog.extra;

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
            name,
            metas: [],
            extra: [],
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

function includes<T extends string>(
  array: readonly T[],
  value: string,
): value is T {
  return !!array.find((item) => value === item);
}

export default Manifest;
