'use client';

import { useSession } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import { getUserFavorites, removeFromFavorites } from '@/db/recipe';
import { toast } from 'react-toastify';
import { Heart, Trash2, Clock, ChefHat, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MyFavoritesPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (user?.email) {
      getUserFavorites(user.email).then((data) => {
        setFavorites(data || []);
        setLoading(false);
      });
    }
  }, [user?.email]);

  const handleRemove = async (recipeId) => {
    setRemovingId(recipeId);
    const result = await removeFromFavorites(user.email, recipeId);
    if (result?.deletedCount > 0) {
      toast.success('Removed from favorites');
      setFavorites(favorites.filter((f) => f._id !== recipeId));
    } else {
      toast.error('Failed to remove');
    }
    setRemovingId(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
        <p className="text-orange-300/60 text-sm">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <Heart className="text-pink-400" size={28} />
          My Favorites
        </h1>
        <p className="text-orange-300/50 text-sm mt-1">
          {favorites.length} saved recipe{favorites.length !== 1 ? 's' : ''}
        </p>
      </motion.div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={48} className="mx-auto text-pink-400/30 mb-4" />
          <p className="text-orange-300/50 text-lg mb-2">No favorites yet</p>
          <p className="text-orange-300/30 text-sm">
            Browse recipes and click the heart icon to save your favorites
          </p>
          <a
            href="/browse"
            className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            Browse Recipes
          </a>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {favorites.map((recipe) => (
            <motion.div
              key={recipe._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-orange-900/20 bg-[#1a0f0c] overflow-hidden hover:border-orange-900/40 transition-all group"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={recipe.image || '/placeholder-recipe.jpg'}
                  alt={recipe.recipeName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0c] via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-orange-500/80 text-white text-xs">
                  {recipe.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-white mb-1 truncate">
                  {recipe.recipeName}
                </h3>
                <div className="flex items-center gap-3 text-xs text-orange-300/50 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {recipe.prepTime}
                  </span>
                  <span>{recipe.cuisineType}</span>
                </div>
                <button
                  onClick={() => handleRemove(recipe._id)}
                  disabled={removingId === recipe._id}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50"
                >
                  {removingId === recipe._id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyFavoritesPage;
