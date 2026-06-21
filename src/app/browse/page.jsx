import BrowseRecipeClient from '@/component/browsecomponent/BrowseRecipeClient';
import { getAllRecipeData } from '@/db/recipe';
import React from 'react';

const BrowesRecipe = async () => {
  const data = await getAllRecipeData();

  return (
    <div className="bg-[#0c0604] min-h-screen">
      <BrowseRecipeClient initialData={data} />
    </div>
  );
};

export default BrowesRecipe;
