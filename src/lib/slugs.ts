export function categoryToSlug(title: string): string {
  if (!title) return "";
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents (e.g. Škoda -> Skoda)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
