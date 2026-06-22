'use client';

import { useSession } from '@/lib/auth-client';
import { useState, useEffect } from 'react';
import { addRecipe, getRecipeCount } from '@/db/recipe';
import { toast } from 'react-toastify';
import {
  Upload,
  ChefHat,
  Clock,
  Plus,
  X,
  Crown,
  ImagePlus,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  'Appetizer', 'Main Course', 'Dessert', 'Soup', 'Salad',
  'Breakfast', 'Snack', 'Beverage', 'Side Dish', 'Bread',
];

const CUISINE_TYPES = [
  'Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese',
  'Thai', 'French', 'Mediterranean', 'American', 'Korean',
  'Middle Eastern', 'Bangladeshi', 'Other',
];

const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard', 'Expert'];

const AddRecipePage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState(['']);

  const [form, setForm] = useState({
    recipeName: '',
    category: '',
    cuisineType: '',
    difficulty: '',
    prepTime: '',
    instructions: '',
  });

  // Check recipe limit on mount
  useEffect(() => {
    if (user?.email) {
      getRecipeCount(user.email).then((data) => {
        if (data.count >= 2 && !user?.isPremium) {
          setLimitReached(true);
        }
      });
    }
  }, [user?.email, user?.isPremium]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: 'POST', body: formData }
      );
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.data.display_url);
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Image upload failed');
      }
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  const updateIngredient = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error('Please upload a recipe image');
      return;
    }

    const filteredIngredients = ingredients.filter((i) => i.trim() !== '');
    if (filteredIngredients.length === 0) {
      toast.error('Please add at least one ingredient');
      return;
    }

    setSubmitting(true);

    const recipeData = {
      recipeName: form.recipeName,
      image: imageUrl,
      category: form.category,
      cuisineType: form.cuisineType,
      difficulty: form.difficulty,
      prepTime: form.prepTime,
      ingredients: filteredIngredients,
      instructions: form.instructions,
      userEmail: user.email,
      userName: user.name,
    };

    const result = await addRecipe(recipeData);

    if (result?.error && result?.limitReached) {
      setLimitReached(true);
      toast.error('Recipe limit reached! Upgrade to premium.');
    } else if (result?.error) {
      toast.error(result.message || 'Failed to add recipe');
    } else {
      toast.success('Recipe added successfully!');
      // Reset form
      setForm({ recipeName: '', category: '', cuisineType: '', difficulty: '', prepTime: '', instructions: '' });
      setImageUrl('');
      setIngredients(['']);
    }
    setSubmitting(false);
  };

  // Premium limit modal
  if (limitReached) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center p-8 rounded-2xl border border-yellow-500/20 bg-gradient-to-b from-yellow-500/5 to-transparent"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
            <Crown size={32} className="text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Recipe Limit Reached</h2>
          <p className="text-orange-300/60 text-sm mb-6">
            As a free member, you can add up to <strong className="text-white">2 recipes</strong>.
            Upgrade to premium for unlimited recipe uploads!
          </p>
          <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-yellow-500/20">
            Upgrade to Premium
          </button>
          <a
            href="/dashboard/user/my-recipes"
            className="block mt-3 text-sm text-orange-300/50 hover:text-orange-300 transition-colors"
          >
            View My Recipes →
          </a>
        </motion.div>
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
          <ChefHat className="text-orange-400" size={28} />
          Add New Recipe
        </h1>
        <p className="text-orange-300/50 text-sm mt-1">
          Share your culinary masterpiece with the world
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Recipe Name */}
        <div>
          <label className="block text-sm font-medium text-orange-200/80 mb-2">
            Recipe Name *
          </label>
          <input
            type="text"
            name="recipeName"
            value={form.recipeName}
            onChange={handleChange}
            required
            placeholder="e.g. Spicy Chicken Tikka Masala"
            className="w-full px-4 py-3 rounded-xl bg-[#1a0f0c] border border-orange-900/30 text-white placeholder-orange-300/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-orange-200/80 mb-2">
            Recipe Image * (uploaded to imgbb)
          </label>
          <div className="relative">
            {imageUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-orange-900/30">
                <img src={imageUrl} alt="Recipe" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-orange-900/30 bg-[#1a0f0c] cursor-pointer hover:border-orange-500/40 transition-colors">
                {uploading ? (
                  <Loader2 size={32} className="text-orange-400 animate-spin" />
                ) : (
                  <>
                    <ImagePlus size={32} className="text-orange-400/60 mb-2" />
                    <span className="text-sm text-orange-300/50">Click to upload image</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            )}
          </div>
        </div>

        {/* Row: Category + Cuisine */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-orange-200/80 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1a0f0c] border border-orange-900/30 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all appearance-none"
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-200/80 mb-2">
              Cuisine Type *
            </label>
            <select
              name="cuisineType"
              value={form.cuisineType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1a0f0c] border border-orange-900/30 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all appearance-none"
            >
              <option value="">Select Cuisine</option>
              {CUISINE_TYPES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row: Difficulty + Prep Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-orange-200/80 mb-2">
              Difficulty Level *
            </label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1a0f0c] border border-orange-900/30 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all appearance-none"
            >
              <option value="">Select Difficulty</option>
              {DIFFICULTY_LEVELS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-200/80 mb-2">
              Preparation Time *
            </label>
            <div className="relative">
              <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400/40" />
              <input
                type="text"
                name="prepTime"
                value={form.prepTime}
                onChange={handleChange}
                required
                placeholder="e.g. 45 minutes"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1a0f0c] border border-orange-900/30 text-white placeholder-orange-300/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-orange-200/80 mb-2">
            Ingredients *
          </label>
          <div className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#1a0f0c] border border-orange-900/30 text-white placeholder-orange-300/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all text-sm"
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="px-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 text-xs font-medium hover:bg-orange-500/20 transition-colors"
          >
            <Plus size={14} /> Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium text-orange-200/80 mb-2">
            Instructions *
          </label>
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Step by step cooking instructions..."
            className="w-full px-4 py-3 rounded-xl bg-[#1a0f0c] border border-orange-900/30 text-white placeholder-orange-300/30 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold hover:from-orange-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Adding Recipe...
            </>
          ) : (
            <>
              <Upload size={18} />
              Add Recipe
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
};

export default AddRecipePage;
