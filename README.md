# StremIO Addon Template

Your new StremIO addon is ready to go. You can start adding your own resources
to make it great.

## Demo

https://strem.deno.dev

## Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

## Resources

This template provides two catalogs: movies and series under `routes/catalog`.
Use these as a starting point to add your own catalogs.

For streams, you can use the `routes/stream` directory. By default, a generic
route will grab the matching JSON files from corresponding type directories.

If dynamic streams are needed, you can use the `routes/stream/[type]/[id].ts` to
handle the stream fetching.

The `manifest.json` is automatically generated from the `manifest.json.ts` file
using the routes you have defined. You can change basic information for the
addon in that file.
