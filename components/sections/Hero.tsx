"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="hero" className="relative w-full">
      {/*
        MOBILE - Ajustes (cambia y guarda para ver con hot reload):
        - Altura del bloque: min-h-[56vh] → cambia 56 (ej: 60, 70, 80).
        - Posición de la imagen: en la clase object-[...] del Image mobile (abajo).
          Ejemplo: object-[50%_40%] = 50% horizontal, 40% vertical (0=arriba/izq, 100=abajo/der).
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full min-h-[57vh] md:min-h-0"
      >
        {/* Desktop image */}
        <Image
          src="/hero/hero-image.jpeg"
          alt="Oh Sh!rt"
          width={1920}
          height={1080}
          quality={95}
          priority
          className="w-full h-auto hidden md:block"
          sizes="100vw"
        />
        {/* Mobile image - fills at least 60vh, covers without distortion */}
        <Image
          src="/hero/hero_mobile.jpeg"
          alt="Oh Sh!rt"
          fill
          quality={95}
          priority
          className="object-cover md:hidden"
          sizes="100vw"
        />
      </motion.div>
    </section>
  );
}
