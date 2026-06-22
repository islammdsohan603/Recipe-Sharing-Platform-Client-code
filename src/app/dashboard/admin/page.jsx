'use client';

import { useSession } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import { getAdminStats } from '@/db/recipe';
import { Users, ChefHat, Crown, Heart, BarChart3, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import StatsGrid from '@/component/dashboard/StatsGrid';

const AdminPage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (isPending || loading) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
        <p className="text-orange-300/60 text-sm">Loading admin dashboard...</p>
      </div>
    );
  }

  const adminStatCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
      bgGlow: 'bg-blue-500/10',
    },
    {
      title: 'Total Recipes',
      value: stats?.totalRecipes || 0,
      icon: ChefHat,
      gradient: 'from-orange-500 to-amber-600',
      bgGlow: 'bg-orange-500/10',
    },
    {
      title: 'Premium Members',
      value: stats?.premiumMembers || 0,
      icon: Crown,
      gradient: 'from-yellow-500 to-amber-600',
      bgGlow: 'bg-yellow-500/10',
    },
    {
      title: 'Total Favorites',
      value: stats?.totalFavorites || 0,
      icon: Heart,
      gradient: 'from-pink-500 to-rose-600',
      bgGlow: 'bg-pink-500/10',
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
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Welcome, <span className="text-orange-400">{user?.name}</span>
        </h1>
        <p className="text-orange-300/50 text-sm mt-1 flex items-center gap-2">
          <BarChart3 size={14} />
          Admin Dashboard Overview
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        {adminStatCards.map((stat, index) => (
          <motion.div key={index} variants={cardVariants}>
            <div
              className={`relative overflow-hidden rounded-2xl border border-orange-900/20 bg-[#1a0f0c] p-6 ${stat.bgGlow} hover:border-orange-900/40 transition-all duration-300 group`}
            >
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

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-orange-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/dashboard/admin/manage-users"
            className="flex items-center gap-4 p-4 rounded-xl border border-orange-900/20 bg-[#1a0f0c] hover:border-blue-500/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Users size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Manage Users</p>
              <p className="text-xs text-orange-300/40">View & manage all users</p>
            </div>
          </a>
          <a
            href="/dashboard/admin/manage-recipes"
            className="flex items-center gap-4 p-4 rounded-xl border border-orange-900/20 bg-[#1a0f0c] hover:border-orange-500/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
              <ChefHat size={18} className="text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Manage Recipes</p>
              <p className="text-xs text-orange-300/40">View & moderate recipes</p>
            </div>
          </a>
          <a
            href="/dashboard/admin/reports"
            className="flex items-center gap-4 p-4 rounded-xl border border-orange-900/20 bg-[#1a0f0c] hover:border-green-500/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <BarChart3 size={18} className="text-green-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">View Reports</p>
              <p className="text-xs text-orange-300/40">Analytics & insights</p>
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPage;
