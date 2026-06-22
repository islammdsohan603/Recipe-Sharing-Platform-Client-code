'use client';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import api from '@/lib/api';
import { toast } from 'react-toastify';

const LikeButtons = ({ recipeId, initialLikesCount }) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount || 0);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await api.patch(`/api/recipe/${recipeId}/like`);
      if (res.data) {
        setLikesCount((prev) => prev + 1);
        toast.success("Recipe liked!");
      }
    } catch (error) {
      toast.error("You must be logged in to like a recipe.");
      console.error(error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLike}
        disabled={isLiking}
        className="flex items-center cursor-pointer gap-2 bg-orange-500 px-5 py-3 rounded-xl text-white disabled:opacity-50"
      >
        <Heart size={18} />
        Like ({likesCount})
      </motion.button>
    </div>
  );
};

export default LikeButtons;
