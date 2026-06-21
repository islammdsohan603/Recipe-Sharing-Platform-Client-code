import RecipeDetailsClientCard from '@/component/browsecomponent/RecipeDetailsClientCard';
import { getDetailsRecipeData } from '@/db/recipe';

import React from 'react';

const RecipeDetails = async ({ params }) => {
  const resolveParams = await params;
  const id = resolveParams.id;

  const recipe = await getDetailsRecipeData(id);

  return (
    <div>
      <RecipeDetailsClientCard recipe={recipe} />
    </div>
  );
};

export default RecipeDetails;
