'use client';

import Image from 'next/image';
import { Clock, ChefHat, Star, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LikeButtons from '../actionbutton/LikeButtons';
import FavoriteButtons from '../actionbutton/FavoriteButtons';
import PurchaseButtons from '../actionbutton/PurchaseButtons';
import ReportButtons from '../actionbutton/ReportButtons';

const RecipeDetailsClientCard = ({ recipe }) => {
  const {
    recipeName,
    recipeImage,
    category,
    cuisineType,
    difficultyLevel,
    preparationTime,
    ingredients,
    instructions,
    authorName,
    authorEmail,
    likesCount,
  } = recipe;

  return (
    <section className="bg-[#0c0604] min-h-screen py-16">
      <div className="w-11/12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-300 group"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Recipes
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-orange-500/20 blur-3xl rounded-full" />

            <Image
              src={recipeImage}
              alt={recipeName}
              width={700}
              height={700}
              className="relative rounded-3xl object-cover w-full h-[500px]"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm">
              {category}
            </span>

            <h1 className="text-5xl font-bold text-white mt-5">{recipeName}</h1>

            <div className="flex flex-wrap gap-5 mt-6 text-[#cdb7aa]">
              <div className="flex items-center gap-2">
                <ChefHat size={18} />
                {cuisineType}
              </div>

              <div className="flex items-center gap-2">
                <Clock size={18} />
                {preparationTime} Minutes
              </div>

              <div className="flex items-center gap-2">
                <Star size={18} />
                {difficultyLevel}
              </div>
            </div>

            <p className="text-[#cdb7aa] mt-6 leading-8">{instructions}</p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div>
                <LikeButtons likesCount={likesCount} />
              </div>

              <div>
                <FavoriteButtons />
              </div>

              <div>
                <PurchaseButtons />
              </div>

              <div>
                <ReportButtons />
              </div>
            </div>

            {/* Author */}
            <div className="mt-10 border-t border-white/10 pt-6">
              <h3 className="text-white font-semibold">Recipe Author</h3>

              <p className="text-[#cdb7aa] mt-2">{authorName}</p>

              <p className="text-[#cdb7aa]">{authorEmail}</p>
            </div>
          </motion.div>
        </div>

        {/* Ingredients */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Ingredients</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ingredients.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-[#f5dec9]"
              >
                ✅ {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecipeDetailsClientCard;
