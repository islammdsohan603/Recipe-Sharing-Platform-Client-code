'use client';

import { useSession } from '@/lib/auth-client';
import { ShoppingBag, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const PurchasedRecipesPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <ShoppingBag className="text-emerald-400" size={28} />
          Purchased Recipes
        </h1>
        <p className="text-orange-300/50 text-sm mt-1">
          Recipes you have purchased
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <Package size={40} className="text-emerald-400/40" />
        </div>
        <p className="text-orange-300/50 text-lg mb-2">No purchased recipes yet</p>
        <p className="text-orange-300/30 text-sm max-w-md mx-auto">
          When you purchase premium recipes from other chefs, they will appear here for easy access.
        </p>
        <a
          href="/browse"
          className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
        >
          Browse Recipes
        </a>
      </motion.div>
    </div>
  );
};

export default PurchasedRecipesPage;
