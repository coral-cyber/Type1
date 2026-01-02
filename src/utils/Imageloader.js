export const images = import.meta.glob("/src/assets/items/*", { eager: true });
export function getImage(path) {
  if (!path) return null;
  const key = path.startsWith("/") ? path : `/${path}`;
  return images[key]?.default ?? null;
}
