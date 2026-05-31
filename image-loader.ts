// Static-export image loader: serves local public/ images as-is, prefixed with
// the deploy basePath so they resolve under the GitHub Pages project subpath.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src }: { src: string }) {
  return src.startsWith("/") ? `${basePath}${src}` : src;
}
