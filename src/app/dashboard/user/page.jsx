'use client';

import { useSession } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import { getUserStats } from '@/db/recipe';
import { BookOpen, Heart, ThumbsUp, Crown, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import StripeCheckoutWrapper from '@/component/StripeCheckout';

const UserOverviewPage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  useEffect(() => {
    if (user?.email) {
      getUserStats(user.email).then((data) => {
        setStats(data);
        setLoading(false);
      });
    }
  }, [user?.email]);

  if (isPending || loading) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
        <p className="text-orange-300/60 text-sm">Loading dashboard...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Recipes',
      value: stats?.totalRecipes || 0,
      icon: BookOpen,
      gradient: 'from-orange-500 to-amber-600',
      bgGlow: 'bg-orange-500/10',
    },
    {
      title: 'Total Favorites',
      value: stats?.totalFavorites || 0,
      icon: Heart,
      gradient: 'from-pink-500 to-rose-600',
      bgGlow: 'bg-pink-500/10',
    },
    {
      title: 'Total Likes Received',
      value: stats?.totalLikes || 0,
      icon: ThumbsUp,
      gradient: 'from-blue-500 to-indigo-600',
      bgGlow: 'bg-blue-500/10',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div>
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome back, <span className="text-orange-400">{user?.name}</span>
          </h1>
          {stats?.isPremium && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
              <Crown size={14} className="text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400">PREMIUM</span>
            </span>
          )}
        </div>
        <p className="text-orange-300/50 text-sm">
          Here&apos;s an overview of your recipe activity
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
      >
        {statCards.map((stat, index) => (
          <motion.div key={index} variants={cardVariants}>
            <div
              className={`relative overflow-hidden rounded-2xl border border-orange-900/20 bg-[#1a0f0c] p-6 ${stat.bgGlow} hover:border-orange-900/40 transition-all duration-300 group`}
            >
              {/* Background Decoration */}
              <div className="absolute -top-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon size={120} />
              </div>

              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <stat.icon size={22} className="text-white" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-sm text-orange-300/50">{stat.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Premium Upsell (if not premium) */}
      {!stats?.isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-500/10 to-orange-500/5 p-6"
        >
          <div className="absolute top-0 right-0 opacity-5">
            <Sparkles size={200} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown size={20} className="text-yellow-400" />
                <h3 className="text-lg font-bold text-white">Upgrade to Premium</h3>
              </div>
              <p className="text-sm text-orange-300/60 max-w-md">
                You can only add up to 2 recipes as a free member. Unlock unlimited recipe uploads and premium features!
              </p>
            </div>
            <button 
              onClick={() => setShowPremiumModal(true)}
              className="shrink-0 px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold text-sm hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-yellow-500/20"
            >
              Go Premium
            </button>
          </div>
        </motion.div>
      )}

      {showPremiumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-[#101010] p-6 shadow-2xl border border-white/10">
            <button
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-white mb-4">Upgrade to Premium</h2>
            <p className="text-sm text-gray-400 mb-6">
              Unlock unlimited recipe creation for just $10.
            </p>
            <StripeCheckoutWrapper
              userEmail={user?.email}
              onSuccess={() => {
                setShowPremiumModal(false);
                setStats({...stats, isPremium: true});
              }}
            />
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-orange-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/dashboard/user/add-recipe"
            className="flex items-center gap-4 p-4 rounded-xl border border-orange-900/20 bg-[#1a0f0c] hover:border-orange-500/30 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
              <BookOpen size={18} className="text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Add New Recipe</p>
              <p className="text-xs text-orange-300/40">Share your culinary creation</p>
            </div>
          </a>
          <a
            href="/dashboard/user/my-recipes"
            className="flex items-center gap-4 p-4 rounded-xl border border-orange-900/20 bg-[#1a0f0c] hover:border-orange-500/30 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Heart size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">View My Recipes</p>
              <p className="text-xs text-orange-300/40">Manage your recipe collection</p>
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default UserOverviewPage;
