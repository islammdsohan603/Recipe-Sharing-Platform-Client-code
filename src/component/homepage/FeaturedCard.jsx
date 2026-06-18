'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Star } from 'lucide-react';
import Link from 'next/link';

const FeaturedCard = ({ recipe }) => {
  const {
    recipeName,
    recipeImage,
    category,
    cuisineType,
    preparationTime,
    authorName,
    likesCount,
  } = recipe;

  return (
    <motion.div
      whileHover={{ y: -12, boxShadow: '0 30px 60px rgba(255, 109, 51, 0.25)' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-3xl bg-linear-to-b from-[#1a0f0c] to-[#0c0604] border border-orange-500/30 hover:border-orange-500/70 transition-colors duration-300"
    >
      {/* Image Container - Larger for Featured */}
      <div className="relative h-72 w-full overflow-hidden bg-[#1a0f0c]">
        {recipeImage ? (
          <Image
            src={recipeImage}
            alt={recipeName || 'Featured Recipe'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            priority={true}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#0c0604]/95" />

        {/* Featured Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 left-4 flex items-center gap-2 bg-orange-500/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
        >
          <Star size={16} className="text-white fill-white" />
          <span className="text-sm font-bold text-white">Featured</span>
        </motion.div>

        {/* Likes Count */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm hover:bg-orange-500/95 cursor-pointer px-4 py-2 rounded-full transition-colors duration-300 shadow-lg"
        >
          <Heart size={16} className="text-white fill-white" />
          <span className="text-sm font-bold text-white">
            {likesCount || 0}
          </span>
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative p-6 space-y-4">
        {/* Recipe Name - Larger for Featured */}
        <h2 className="text-2xl font-bold text-white line-clamp-2 group-hover:text-orange-400 transition-colors duration-300">
          {recipeName}
        </h2>

        {/* Category & Cuisine */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-orange-500/25 text-orange-300 font-semibold border border-orange-500/40">
            {category}
          </span>
          <span className="text-xs px-3 py-1.5 rounded-full bg-white/8 text-[#f5dec9] font-semibold border border-white/15">
            {cuisineType}
          </span>
        </div>

        {/* Preparation Time */}
        <div className="flex items-center gap-2 text-sm text-[#cdb7aa]">
          <Clock size={18} className="text-orange-400 shrink-0" />
          <span className="font-semibold">{preparationTime || 'N/A'} mins</span>
        </div>

        {/* Author Info */}
        <div className="pt-3 border-t border-orange-950/40">
          <p className="text-sm text-[#cdb7aa]">
            Curated by{' '}
            <span className="text-white font-bold">{authorName}</span>
          </p>
        </div>

        {/* Hover Action */}
        <div className="absolute inset-0 flex items-end p-6 bg-linear-to-t from-[#0c0604] via-[#0c0604]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <Link href={'/'} className="w-full">
            <button className="w-full cursor-pointer py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-colors duration-300 pointer-events-auto shadow-lg text-lg">
              View Full Recipe
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedCard;
