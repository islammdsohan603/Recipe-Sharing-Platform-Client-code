'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

export default function SeasonalHarvestCard() {
  return (
    <section id="harvest" className="bg-[#0c0604] px-4 py-14 sm:px-6 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="group relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-linear-to-br from-[#2d1f18] via-[#3a261c] to-[#1d140f] px-5 py-8 shadow-2xl sm:rounded-3xl sm:px-8 sm:py-10 lg:px-12 lg:py-14"
      >
        {/* Glow */}
        <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-lime-400/10 blur-3xl" />

        {/* Floating Background Shape */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute right-4 top-6 h-16 w-16 rounded-full border border-white/10 sm:right-10 sm:top-10 sm:h-24 sm:w-24"
        />

        <div className="relative z-10 max-w-2xl">
          {/* Small Label */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-400 sm:text-xs sm:tracking-[0.3em]"
          >
            Autumn Sale
          </motion.span>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
          >
            <span className="text-white">Seasonal Harvest:</span>
            <br />
            <span className="bg-linear-to-r from-lime-300 to-yellow-400 bg-clip-text text-transparent">
              Heirloom Root Crops
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 max-w-lg text-sm leading-7 text-gray-300 sm:text-base"
          >
            From sweet beets and earthy turnips to vibrant carrots and parsnips,
            our root crop harvest celebrates the richness of the season.
          </motion.p>

          {/* Button */}
          <Link href={'/browse'}>
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="mt-8 inline-flex w-full items-center justify-center cursor-pointer gap-3 rounded-full bg-lime-400 px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-lime-300 sm:w-auto"
            >
              Explore Collection
              <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
