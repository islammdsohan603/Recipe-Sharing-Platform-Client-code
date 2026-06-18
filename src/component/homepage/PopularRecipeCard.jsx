'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock } from 'lucide-react';
import Link from 'next/link';

const PopularRecipeCard = ({ recipe }) => {
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
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(255, 109, 51, 0.15)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl bg-linear-to-b from-[#1a0f0c] to-[#0c0604] border border-orange-950/30 hover:border-orange-600/50 transition-colors duration-300"
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-[#1a0f0c]">
        {recipeImage ? (
          <Image
            src={recipeImage}
            alt={recipeName || 'Recipe Image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            priority={true}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#0c0604]/90" />

        {/* Likes Count */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm hover:bg-orange-500/90 cursor-pointer px-3 py-1.5 rounded-full transition-colors duration-300"
        >
          <Heart size={14} className="text-white fill-white" />
          <span className="text-xs font-semibold text-white">
            {likesCount || 0}
          </span>
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative p-5 space-y-3">
        {/* Recipe Name */}
        <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-orange-400 transition-colors duration-300">
          {recipeName}
        </h3>

        {/* Category & Cuisine */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 font-medium border border-orange-500/30">
            {category}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[#f5dec9] font-medium border border-white/10">
            {cuisineType}
          </span>
        </div>

        {/* Preparation Time */}
        <div className="flex items-center gap-2 text-sm text-[#cdb7aa]">
          <Clock size={16} className="text-orange-400 shrink-0" />
          <span className="font-medium">{preparationTime || 'N/A'} mins</span>
        </div>

        {/* Author Info */}
        <div className="pt-2 border-t border-orange-950/30">
          <p className="text-xs text-[#cdb7aa]">
            By <span className="text-white font-semibold">{authorName}</span>
          </p>
        </div>

        {/* Hover Action */}
        <div className="absolute inset-0 flex items-end p-4 bg-linear-to-t from-[#0c0604] via-[#0c0604]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <Link href={'/'} className="w-full">
            <button className="w-full cursor-pointer py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors duration-300 pointer-events-auto">
              View Recipe Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PopularRecipeCard;
