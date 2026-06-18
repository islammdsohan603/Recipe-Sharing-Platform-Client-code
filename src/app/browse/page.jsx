import FeaturedCard from '@/component/homepage/FeaturedCard';
import PopularRecipeCard from '@/component/homepage/PopularRecipeCard';
import { getAllRecipeData } from '@/db/recipe';
import React from 'react';

const BrowesRecipe = async () => {
  const data = await getAllRecipeData();

  return (
    <div className="bg-[#0c0604]">
      <div className="w-11/12 max-w-7xl mx-auto py-6">
        <div>
          <h1> Explore Recipes </h1>
          <span> Showing 124 curated culinary masterpieces </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.map(recipe => (
            <PopularRecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowesRecipe;
