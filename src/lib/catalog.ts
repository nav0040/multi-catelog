import bikes from "@/data/catalog/bikes.json";
import cars from "@/data/catalog/cars.json";
import computers from "@/data/catalog/computers.json";
import phones from "@/data/catalog/phones.json";

export type ItemProp = {
  label: string;
  value: string;
};

export type CatalogItemRaw = {
  itemname: string;
  category: string;
  image: string;
  itemprops: ItemProp[];
  brand?: string;
  segment?: string;
  year?: string;
  rating?: number;
  reviewCount?: number;
  gallery?: string[];
};

export type CatalogItem = CatalogItemRaw & { id: string };

export function getItemBreadcrumbLabels(item: CatalogItem): string[] {
  const { category, itemname, brand, segment } = item;
  if (!brand && !segment) {
    return [category, itemname];
  }
  const parts: string[] = [category];
  if (brand) parts.push(brand);
  if (segment) parts.push(segment);
  parts.push(itemname);
  return parts;
}

export function getItemGalleryImages(item: CatalogItem): string[] {
  const g = item.gallery;
  if (g && g.length > 0) return g;
  return [item.image];
}

const rawItems: CatalogItemRaw[] = [
  ...(cars as CatalogItemRaw[]),
  ...(bikes as CatalogItemRaw[]),
  ...(phones as CatalogItemRaw[]),
  ...(computers as CatalogItemRaw[]),
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";
}

export const catalogItems: CatalogItem[] = rawItems.map((item, index) => ({
  ...item,
  id: `${slugify(item.itemname)}-${index}`,
}));

const byId = new Map(catalogItems.map((item) => [item.id, item]));

export function getItemById(id: string): CatalogItem | undefined {
  return byId.get(id);
}

export type CategoryGroup = { category: string; items: CatalogItem[] };

export function groupByCategory(items: CatalogItem[]): CategoryGroup[] {
  const order: string[] = [];
  const map = new Map<string, CatalogItem[]>();

  for (const item of items) {
    if (!map.has(item.category)) {
      map.set(item.category, []);
      order.push(item.category);
    }
    map.get(item.category)!.push(item);
  }

  return order.map((category) => ({
    category,
    items: map.get(category)!,
  }));
}

export function getCategoryGroups(): CategoryGroup[] {
  return groupByCategory(catalogItems);
}

export function categorySectionHref(categoryName: string): string {
  const slug = categoryName.replace(/\s+/g, "-").toLowerCase();
  return `#category-${slug}`;
}
