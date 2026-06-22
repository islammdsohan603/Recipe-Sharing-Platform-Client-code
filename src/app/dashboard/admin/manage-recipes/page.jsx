'use client';

import { useEffect, useState } from 'react';
import { getAdminRecipes, adminDeleteRecipe } from '@/db/recipe';
import { toast } from 'react-toastify';
import {
  ChefHat,
  Search,
  Trash2,
  Clock,
  Loader2,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';

const ManageRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchRecipes = async () => {
    const data = await getAdminRecipes();
    setRecipes(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;
    setDeletingId(id);
    const result = await adminDeleteRecipe(id);
    if (result?.deletedCount > 0) {
      toast.success('Recipe deleted successfully');
      setRecipes(recipes.filter((r) => r._id !== id));
    } else {
      toast.error('Failed to delete recipe');
    }
    setDeletingId(null);
  };

  const filteredRecipes = recipes.filter(
    (r) =>
      r.recipeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
        <p className="text-orange-300/60 text-sm">Loading recipes...</p>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <ChefHat className="text-orange-400" size={28} />
            Manage Recipes
          </h1>
          <p className="text-orange-300/50 text-sm mt-1">
            {recipes.length} total recipe{recipes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400/40" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#1a0f0c] border border-orange-900/30 text-white text-sm placeholder-orange-300/30 focus:outline-none focus:border-orange-500/50 transition-all"
          />
        </div>
      </motion.div>

      {/* Recipes Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-orange-900/20 bg-[#1a0f0c] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-orange-900/20">
                <th className="text-left px-6 py-4 text-xs font-semibold text-orange-300/50 uppercase tracking-wider">
                  Recipe
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-orange-300/50 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-orange-300/50 uppercase tracking-wider">
                  Author
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-orange-300/50 uppercase tracking-wider">
                  Likes
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-orange-300/50 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-900/10">
              {filteredRecipes.map((recipe) => (
                <tr
                  key={recipe._id}
                  className="hover:bg-orange-500/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-orange-900/20">
                        <img
                          src={recipe.image || '/placeholder-recipe.jpg'}
                          alt={recipe.recipeName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate max-w-[200px]">
                          {recipe.recipeName}
                        </p>
                        <p className="text-xs text-orange-300/40 flex items-center gap-1">
                          <Clock size={10} /> {recipe.prepTime}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium">
                      {recipe.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-orange-300/60 truncate max-w-[150px]">
                      {recipe.userEmail || recipe.userName || 'Unknown'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white font-medium">
                      {recipe.likesCount || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/details/${recipe._id}`}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                        title="View Recipe"
                      >
                        <Eye size={14} />
                      </a>
                      <button
                        onClick={() => handleDelete(recipe._id)}
                        disabled={deletingId === recipe._id}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        title="Delete Recipe"
                      >
                        {deletingId === recipe._id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat size={36} className="mx-auto text-orange-400/30 mb-3" />
            <p className="text-orange-300/50">No recipes found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageRecipesPage;
