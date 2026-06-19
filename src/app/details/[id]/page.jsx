import { getDetailsRecipeData } from '@/db/recipe';
import React from 'react';

const RecipeDetails = async ({ params }) => {
  const resolveParams = await params;
  const id = resolveParams.id;

  const data = await getDetailsRecipeData(id);

  return (
    <div className="flex items-center justify-center min-h-screens">
      <h1>details</h1>
      <h1> {data.recipeName} </h1>
    </div>
  );
};

export default RecipeDetails;
