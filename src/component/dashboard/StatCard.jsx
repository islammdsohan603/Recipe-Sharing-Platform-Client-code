'use client';
import React from 'react';
import { Card } from '@heroui/react';
import { motion } from 'framer-motion';

export default function StatCard({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  bgIcon: BgIcon,
  iconColorClass = 'text-neutral-400',
  iconBgClass = 'bg-neutral-800/50',
}) {
  // Animation for each card entering the layout screen
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="w-full"
    >
      {/* HeroUI v3 utilizes native Tailwind utilities for border radius, shadows, and spacing */}
      <Card className="relative overflow-hidden border border-neutral-800 bg-[#121212] p-2 text-white h-[160px] w-full rounded-2xl">
        {/* Background decorative watermark */}
        {BgIcon && (
          <div className="absolute bottom-[-30px] right-[-15px] text-neutral-800/15 pointer-events-none z-0">
            <BgIcon size={150} strokeWidth={1} />
          </div>
        )}

        {/* HeroUI v3 compound syntax replacing legacy v2 CardBody */}
        <Card.Content className="relative z-10 flex flex-col justify-between h-full p-4">
          {/* Top Row: Icon Container & Percentage Trend Indicator */}
          <div className="flex items-center justify-between w-full">
            <div
              className={`p-2.5 rounded-xl ${iconBgClass} flex items-center justify-center`}
            >
              {Icon && <Icon className={iconColorClass} size={20} />}
            </div>

            <div
              className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-green-500' : 'text-rose-400'}`}
            >
              <span>{isPositive ? `+${change}%` : `${change}%`}</span>
              <span>{isPositive ? '↗' : '↘'}</span>
            </div>
          </div>

          {/* Bottom Row: Main Counter Value and Descriptor Text */}
          <div className="mt-4 flex flex-col gap-0.5">
            <span className="text-3xl font-bold tracking-tight text-neutral-100">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            <span className="text-xs font-medium text-neutral-400">
              {title}
            </span>
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  );
}
