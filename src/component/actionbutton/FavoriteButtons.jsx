import { Bookmark } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

const FavoriteButtons = () => {
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center cursor-pointer gap-2 bg-yellow-500 px-5 py-3 rounded-xl text-white"
      >
        <Bookmark size={18} />
        Favorite
      </motion.button>
    </div>
  );
};

export default FavoriteButtons;
