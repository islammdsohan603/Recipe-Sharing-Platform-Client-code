'use client';

import { useEffect, useState } from 'react';
import { getAdminReports } from '@/db/recipe';
import {
  BarChart3,
  TrendingUp,
  Users,
  ChefHat,
  Heart,
  Award,
} from 'lucide-react';
import { motion } from 'framer-motion';

const ReportsPage = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminReports().then((data) => {
      setReports(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
        <p className="text-orange-300/60 text-sm">Loading reports...</p>
      </div>
    );
  }

  const maxCategoryCount = Math.max(
    ...(reports?.recipesByCategory?.map((c) => c.count) || [1])
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <BarChart3 className="text-green-400" size={28} />
          Reports & Analytics
        </h1>
        <p className="text-orange-300/50 text-sm mt-1">
          Platform insights and statistics
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
      >
        <div className="rounded-2xl border border-orange-900/20 bg-[#1a0f0c] p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Users size={22} className="text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{reports?.totalUsers || 0}</p>
            <p className="text-sm text-orange-300/50">Total Users</p>
          </div>
        </div>
        <div className="rounded-2xl border border-orange-900/20 bg-[#1a0f0c] p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <ChefHat size={22} className="text-orange-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{reports?.totalRecipes || 0}</p>
            <p className="text-sm text-orange-300/50">Total Recipes</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recipes by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-orange-900/20 bg-[#1a0f0c] p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <TrendingUp size={18} className="text-orange-400" />
            Recipes by Category
          </h2>

          {reports?.recipesByCategory?.length > 0 ? (
            <div className="space-y-3">
              {reports.recipesByCategory.map((cat, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-orange-200/70">{cat._id || 'Uncategorized'}</span>
                    <span className="text-sm font-semibold text-white">{cat.count}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-orange-900/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.count / maxCategoryCount) * 100}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-orange-300/40 text-sm text-center py-8">No category data available</p>
          )}
        </motion.div>

        {/* Top Liked Recipes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-orange-900/20 bg-[#1a0f0c] p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <Award size={18} className="text-yellow-400" />
            Top Liked Recipes
          </h2>

          {reports?.topRecipes?.length > 0 ? (
            <div className="space-y-3">
              {reports.topRecipes.map((recipe, index) => (
                <div
                  key={recipe._id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#110a07] border border-orange-900/10 hover:border-orange-900/30 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                      index === 0
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : index === 1
                        ? 'bg-gray-400/20 text-gray-300'
                        : index === 2
                        ? 'bg-orange-700/20 text-orange-500'
                        : 'bg-orange-900/20 text-orange-300/50'
                    }`}
                  >
                    #{index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-orange-900/20">
                    <img
                      src={recipe.image || '/placeholder-recipe.jpg'}
                      alt={recipe.recipeName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {recipe.recipeName}
                    </p>
                    <p className="text-xs text-orange-300/40">{recipe.category}</p>
                  </div>
                  <div className="flex items-center gap-1 text-pink-400 shrink-0">
                    <Heart size={12} fill="currentColor" />
                    <span className="text-sm font-semibold">{recipe.likesCount || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-orange-300/40 text-sm text-center py-8">No recipe data available</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ReportsPage;
