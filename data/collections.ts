import type { Collection } from "@/lib/types/product";

export const collections: Collection[] = [
  {
    id: "polos",
    name: "Polos",
    slug: "polos",
    description: "Classic polo shirts with a streetwear edge.",
  },
  {
    id: "jackets",
    name: "Jackets",
    slug: "jackets",
    description: "Workwear-inspired outerwear for everyday use.",
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    description: "Caps, bags, and essential add-ons.",
  },
  {
    id: "flannel-long-sleeve",
    name: "Flannel Sh!rts – Long Sleeve",
    slug: "flannel-long-sleeve",
    description: "Classic long sleeve flannels with timeless plaid patterns.",
  },
  {
    id: "flannel-short-sleeve",
    name: "Flannel Sh!rts – Short Sleeve",
    slug: "flannel-short-sleeve",
    description: "Short sleeve flannels for warm weather styling.",
  },
  {
    id: "flannel-patchwork-long-sleeve",
    name: "Flannel Patchwork Sh!rts – Long Sleeve",
    slug: "flannel-patchwork-long-sleeve",
    description: "Bold patchwork flannels with mixed fabrics and patterns.",
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((col) => col.slug === slug);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((col) => col.id === id);
}
