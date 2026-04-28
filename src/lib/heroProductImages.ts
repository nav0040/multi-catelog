export const HERO_PRODUCT_TILE_COUNT = 20;

export const PRODUCT_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560769622-7e5c91873073?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605774337667-7d60e36c35b4?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601784555446-1043d9392484?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591047134880-4ca8897dd36e?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620799140408-ed534d1de8df?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618366712010-f4a409990d59?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593642632559-0c9d28b1925d?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1726732970014-f2df88c87dd3?w=400&q=80&auto=format&fit=crop",
];

export function buildHeroProductImages(
  catalogImageUrls: string[],
  max = HERO_PRODUCT_TILE_COUNT,
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const url of catalogImageUrls) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    out.push(url);
    if (out.length >= max) return out;
  }
  for (const url of PRODUCT_FALLBACK_IMAGES) {
    if (seen.has(url)) continue;
    seen.add(url);
    out.push(url);
    if (out.length >= max) break;
  }
  return out;
}
