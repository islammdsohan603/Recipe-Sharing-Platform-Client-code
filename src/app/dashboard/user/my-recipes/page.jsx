'use client';

import { useSession } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import { getMyRecipes, deleteRecipe, updateRecipe } from '@/db/recipe';
import { toast } from 'react-toastify';
import {
  BookOpen,
  Pencil,
  Trash2,
  X,
  Clock,
  ChefHat,
  Loader2,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyRecipesPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchRecipes = async () => {
    if (user?.email) {
      const data = await getMyRecipes(user.email);
      setRecipes(data || []);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [user?.email]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;
    setDeletingId(id);
    const result = await deleteRecipe(id);
    if (result?.deletedCount > 0) {
      toast.success('Recipe deleted successfully');
      setRecipes(recipes.filter((r) => r._id !== id));
    } else {
      toast.error('Failed to delete recipe');
    }
    setDeletingId(null);
  };

  const openEdit = (recipe) => {
    setEditingRecipe(recipe._id);
    setEditForm({
      recipeName: recipe.recipeName,
      category: recipe.category,
      cuisineType: recipe.cuisineType,
      difficulty: recipe.difficulty,
      prepTime: recipe.prepTime,
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions,
    });
  };

  const handleUpdate = async () => {
    const result = await updateRecipe(editingRecipe, editForm);
    if (result?.modifiedCount > 0) {
      toast.success('Recipe updated successfully');
      setEditingRecipe(null);
      fetchRecipes();
    } else {
      toast.error('Failed to update recipe');
    }
  };

  const filteredRecipes = recipes.filter((r) =>
    r.recipeName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
        <p className="text-orange-300/60 text-sm">Loading your recipes...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="text-orange-400" size={28} />
            My Recipes
          </h1>
          <p className="text-orange-300/50 text-sm mt-1">
            {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>

        {/* Search */}
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

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-16">
          <ChefHat size={48} className="mx-auto text-orange-400/30 mb-4" />
          <p className="text-orange-300/50 text-lg mb-2">
            {searchTerm ? 'No recipes match your search' : 'No recipes yet'}
          </p>
          {!searchTerm && (
            <a
              href="/dashboard/user/add-recipe"
              className="inline-block mt-2 px-6 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
            >
              Add Your First Recipe
            </a>
          )}
        </div>
      )}

      {/* Recipe Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filteredRecipes.map((recipe) => (
          <motion.div
            key={recipe._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl border border-orange-900/20 bg-[#1a0f0c] overflow-hidden hover:border-orange-900/40 transition-all group"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={recipe.image || '/placeholder-recipe.jpg'}
                alt={recipe.recipeName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0c] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="px-2 py-0.5 rounded-full bg-orange-500/80 text-white text-xs font-medium">
                  {recipe.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">
                  {recipe.difficulty}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-1 truncate">
                {recipe.recipeName}
              </h3>
              <div className="flex items-center gap-4 text-xs text-orange-300/50 mb-3">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {recipe.prepTime}
                </span>
                <span>{recipe.cuisineType}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-orange-900/20">
                <button
                  onClick={() => openEdit(recipe)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-colors"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  disabled={deletingId === recipe._id}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50"
                >
                  {deletingId === recipe._id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingRecipe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEditingRecipe(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a0f0c] border border-orange-900/30 rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Edit Recipe</h2>
                <button
                  onClick={() => setEditingRecipe(null)}
                  className="text-orange-300/50 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-orange-200/80 mb-1">Recipe Name</label>
                  <input
                    type="text"
                    value={editForm.recipeName}
                    onChange={(e) => setEditForm({ ...editForm, recipeName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#110a07] border border-orange-900/30 text-white focus:outline-none focus:border-orange-500/50 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-orange-200/80 mb-1">Category</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#110a07] border border-orange-900/30 text-white focus:outline-none focus:border-orange-500/50 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-orange-200/80 mb-1">Preparation Time</label>
                  <input
                    type="text"
                    value={editForm.prepTime}
                    onChange={(e) => setEditForm({ ...editForm, prepTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#110a07] border border-orange-900/30 text-white focus:outline-none focus:border-orange-500/50 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-orange-200/80 mb-1">Instructions</label>
                  <textarea
                    value={editForm.instructions}
                    onChange={(e) => setEditForm({ ...editForm, instructions: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#110a07] border border-orange-900/30 text-white focus:outline-none focus:border-orange-500/50 transition-all text-sm resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold text-sm hover:from-orange-400 hover:to-amber-500 transition-all"
                >
                  Update Recipe
                </button>
                <button
                  onClick={() => setEditingRecipe(null)}
                  className="px-4 py-2.5 rounded-xl border border-orange-900/30 text-orange-300/60 text-sm hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyRecipesPage;
