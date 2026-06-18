'use client';

import { motion } from 'framer-motion';
import { FaArrowRightLong } from 'react-icons/fa6';

export default function SeasonalHarvestCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-[#2d1f18] via-[#3a261c] to-[#1d140f] p-8 md:p-10 shadow-2xl"
    >
      <div className="w-11/12 max-w-7xl mx-auto">
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
          className="absolute top-10 right-10 h-24 w-24 rounded-full border border-white/10"
        />

        <div className="relative z-10 max-w-xl">
          {/* Small Label */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-xs uppercase tracking-[0.3em] text-lime-400 font-semibold"
          >
            Autumn Sale
          </motion.span>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 text-3xl md:text-5xl font-bold leading-tight"
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
            className="mt-5 max-w-lg text-sm md:text-base text-gray-300 leading-relaxed"
          >
            From sweet beets and earthy turnips to vibrant carrots and parsnips,
            our root crop harvest celebrates the richness of the season.
          </motion.p>

          {/* Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime-400 px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-lime-300"
          >
            Explore Collection
            <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
