"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { collections } from "@/data/collections";
import { getProductsByCollection } from "@/data/products";
import { useState, useEffect } from "react";

// Define the exact order and layout for homepage
const homepageLayout = {
  topRow: ["polos", "flannel-short-sleeve", "jackets"],
  featured: "flannel-patchwork-long-sleeve",
  bottomRowLeft: "accessories", // 2 images, spans 2 columns
  bottomRowRight: "flannel-long-sleeve", // 1 column
};

// Global image index for synchronized transitions
function useSynchronizedImageIndex(intervalMs: number = 4000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return index;
}

// Regular collection card (single image)
function CollectionCard({
  collection,
  index,
  globalImageIndex,
  className = "",
}: {
  collection: (typeof collections)[0];
  index: number;
  globalImageIndex: number;
  className?: string;
}) {
  const products = getProductsByCollection(collection.slug);
  const allImages = products.flatMap((product) => product.images);
  const currentImageIndex = allImages.length > 0 ? globalImageIndex % allImages.length : 0;
  const displayImage = allImages[currentImageIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={className}
    >
      <Link
        href={`/shop?collection=${collection.slug}`}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4]">
          <AnimatePresence mode="wait">
            {displayImage ? (
              <motion.div
                key={displayImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={displayImage}
                  alt={collection.name}
                  fill
                  quality={95}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
            )}
          </AnimatePresence>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="md:px-4 md:py-2 md:bg-black/30 md:backdrop-blur-[2px] md:rounded-lg">
              <h3 className="font-semibold text-white text-center text-sm md:text-lg tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {collection.name}
              </h3>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Featured collection with 3 images side by side (title only)
function FeaturedCollectionCard({
  collection,
  index,
  className = "",
}: {
  collection: (typeof collections)[0];
  index: number;
  className?: string;
}) {
  const products = getProductsByCollection(collection.slug);
  const productImages = products.map((product) => product.images[0]).filter(Boolean);

  const displayImages: string[] = [];
  for (let i = 0; i < 3; i++) {
    if (productImages.length > 0) {
      displayImages.push(productImages[i % productImages.length]);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={className || "col-span-2 sm:col-span-3"}
    >
      <Link
        href={`/shop?collection=${collection.slug}`}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-xl bg-gray-100">
          <div className="flex">
            {displayImages.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className="relative flex-1 aspect-[3/4]"
              >
                <Image
                  src={image}
                  alt={`${collection.name} ${imgIndex + 1}`}
                  fill
                  quality={95}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="md:px-6 md:py-3 md:bg-black/30 md:backdrop-blur-[2px] md:rounded-lg">
              <h3 className="font-semibold text-white text-center text-base md:text-2xl lg:text-3xl tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {collection.name}
              </h3>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Double-width collection with 2 images side by side
function DoubleCollectionCard({
  collection,
  index,
  className = "",
}: {
  collection: (typeof collections)[0];
  index: number;
  className?: string;
}) {
  // Specific images for accessories collection
  const accessoriesImages = [
    "/products/corduroy-cap/corduroy-cap-6.jpeg",
    "/products/corduroy-cap/corduroy-cap-1.jpg",
  ];

  let displayImages: string[];

  if (collection.slug === "accessories") {
    displayImages = accessoriesImages;
  } else {
    const products = getProductsByCollection(collection.slug);
    const productImages = products.map((product) => product.images[0]).filter(Boolean);
    displayImages = [];
    for (let i = 0; i < 2; i++) {
      if (productImages.length > 0) {
        displayImages.push(productImages[i % productImages.length]);
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={className || "col-span-2"}
    >
      <Link
        href={`/shop?collection=${collection.slug}`}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-xl bg-gray-100">
          <div className="flex">
            {displayImages.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className="relative flex-1 aspect-[3/4]"
              >
                <Image
                  src={image}
                  alt={`${collection.name} ${imgIndex + 1}`}
                  fill
                  quality={95}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="md:px-4 md:py-2 md:bg-black/30 md:backdrop-blur-[2px] md:rounded-lg">
              <h3 className="font-semibold text-white text-center text-sm md:text-lg tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {collection.name}
              </h3>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryShowcase() {
  const globalImageIndex = useSynchronizedImageIndex(7000);

  const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

  const topRowCollections = homepageLayout.topRow
    .map(getCollection)
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  const featuredCollection = getCollection(homepageLayout.featured);
  const bottomLeftCollection = getCollection(homepageLayout.bottomRowLeft);
  const bottomRightCollection = getCollection(homepageLayout.bottomRowRight);

  // Mobile-specific collections
  const polosCollection = getCollection("polos");
  const flannelShortCollection = getCollection("flannel-short-sleeve");
  const jacketsCollection = getCollection("jackets");
  const accessoriesCollection = getCollection("accessories");
  const flannelLongCollection = getCollection("flannel-long-sleeve");

  return (
    <section id="collection-showcase" className="relative pt-2 pb-8 sm:pt-3 sm:pb-10">
      <div className="container mx-auto px-4">
        {/* MOBILE LAYOUT - hidden on md and up */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {/* Row 1: Featured full-width (Flannel Patchwork) */}
          {featuredCollection && (
            <FeaturedCollectionCard
              key={`mobile-${featuredCollection.id}`}
              collection={featuredCollection}
              index={0}
              className="col-span-2"
            />
          )}

          {/* Row 2: Polos + Flannel Short Sleeve */}
          {polosCollection && (
            <CollectionCard
              key={`mobile-${polosCollection.id}`}
              collection={polosCollection}
              index={1}
              globalImageIndex={globalImageIndex}
            />
          )}
          {flannelShortCollection && (
            <CollectionCard
              key={`mobile-${flannelShortCollection.id}`}
              collection={flannelShortCollection}
              index={2}
              globalImageIndex={globalImageIndex}
            />
          )}

          {/* Row 3: Accessories full-width */}
          {accessoriesCollection && (
            <DoubleCollectionCard
              key={`mobile-${accessoriesCollection.id}`}
              collection={accessoriesCollection}
              index={3}
              className="col-span-2"
            />
          )}

          {/* Row 4: Jackets + Flannel Long Sleeve */}
          {jacketsCollection && (
            <CollectionCard
              key={`mobile-${jacketsCollection.id}`}
              collection={jacketsCollection}
              index={4}
              globalImageIndex={globalImageIndex}
            />
          )}
          {flannelLongCollection && (
            <CollectionCard
              key={`mobile-${flannelLongCollection.id}`}
              collection={flannelLongCollection}
              index={5}
              globalImageIndex={globalImageIndex}
            />
          )}
        </div>

        {/* DESKTOP LAYOUT - hidden below md */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          {/* Top Row - 3 collections */}
          {topRowCollections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
              globalImageIndex={globalImageIndex}
            />
          ))}

          {/* Middle Row - Featured full-width collection with 3 images */}
          {featuredCollection && (
            <FeaturedCollectionCard
              key={featuredCollection.id}
              collection={featuredCollection}
              index={3}
              className="col-span-3"
            />
          )}

          {/* Bottom Row - Accessories (2 images, 2 cols) + Flannel Long Sleeve (1 col) */}
          {bottomLeftCollection && (
            <DoubleCollectionCard
              key={bottomLeftCollection.id}
              collection={bottomLeftCollection}
              index={4}
              className="col-span-2"
            />
          )}
          {bottomRightCollection && (
            <CollectionCard
              key={bottomRightCollection.id}
              collection={bottomRightCollection}
              index={5}
              globalImageIndex={globalImageIndex}
            />
          )}
        </div>
      </div>
    </section>
  );
}
