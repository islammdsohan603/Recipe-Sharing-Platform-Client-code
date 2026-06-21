import { getPupolarRecipe } from '@/db/recipe';
import PopularRecipeCard from './PopularRecipeCard';

const PopularRecipe = async () => {
  const data = await getPupolarRecipe();

  return (
    <div className="bg-[#0c0604]">
      <div className="w-11/12 max-w-7xl mx-auto py-4 ">
        <div className="space-y-2 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-500 ">
            {' '}
            Trending Now{' '}
          </h1>
          <span className=" font-semibold text-white">
            {' '}
            Most Loved by Our Community this week{' '}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map(recipe => (
            <PopularRecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularRecipe;
