'use client';

import { Bookmark } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { toast } from 'react-toastify';
import { useSession } from '@/lib/auth-client';

const FavoriteButtons = ({ recipeId }) => {
  const { data: session } = useSession();
  const [isFavoriting, setIsFavoriting] = useState(false);

  const handleFavorite = async () => {
    if (!session?.user) {
      toast.error("Please login to add to favorites.");
      return;
    }
    setIsFavoriting(true);
    try {
      const res = await api.post(`/api/favorites`, {
        recipeId,
        userEmail: session.user.email,
        userId: session.user.id || session.user._id,
      });
      if (res.data) {
        toast.success("Added to favorites!");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.info("Already in favorites!");
      } else {
        toast.error("Failed to add to favorites.");
      }
    } finally {
      setIsFavoriting(false);
    }
  };

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleFavorite}
        disabled={isFavoriting}
        className="flex items-center cursor-pointer gap-2 bg-yellow-500 px-5 py-3 rounded-xl text-white disabled:opacity-50"
      >
        <Bookmark size={18} />
        Favorite
      </motion.button>
    </div>
  );
};

export default FavoriteButtons;
