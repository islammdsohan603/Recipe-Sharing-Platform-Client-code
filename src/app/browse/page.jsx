import BrowseRecipeClient from '@/component/browsecomponent/BrowseRecipeClient';
import { getAllRecipeData } from '@/db/recipe';
import React from 'react';

const BrowesRecipe = async ({ searchParams }) => {
  // Await searchParams to support newer Next.js App Router versions where it's a promise
  const params = await searchParams;
  const page = params?.page ? parseInt(params.page) : 1;
  const categories = params?.categories || "";

  const data = await getAllRecipeData(page, 8, categories);

  return (
    <div className="bg-[#0c0604] min-h-screen">
      <BrowseRecipeClient initialData={data} initialPage={page} initialCategories={categories} />
    </div>
  );
};

export default BrowesRecipe;
