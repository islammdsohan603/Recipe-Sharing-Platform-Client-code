'use client';
import React from 'react';
import StatCard from './StatCard';
import { motion } from 'framer-motion';

export default function StatsGrid({ data = [] }) {
  // Configures a staggered visual entrance layout sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
    >
      {data.map((stat, index) => (
        <StatCard
          key={stat.id || index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          isPositive={stat.isPositive}
          icon={stat.icon}
          bgIcon={stat.bgIcon}
          iconColorClass={stat.iconColorClass}
          iconBgClass={stat.iconBgClass}
        />
      ))}
    </motion.div>
  );
}
