import { gerFeaturedRecipe } from '@/db/recipe';
import React from 'react';
import FeaturedCard from './FeaturedCard';

const FeaturedScetion = async () => {
  const result = await gerFeaturedRecipe();

  return (
    <div className="bg-[#0c0604]">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="space-y-2 py-5">
          <h1 className="text-2xl text-orange-700 font-bold">
            {' '}
            Featured Creations{' '}
          </h1>
          <span>Handpicked by our aditorial team</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {result.map(recipe => (
            <FeaturedCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedScetion;
