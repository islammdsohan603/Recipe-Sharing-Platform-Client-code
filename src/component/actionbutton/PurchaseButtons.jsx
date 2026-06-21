import { DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const PurchaseButtons = () => {
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center cursor-pointer gap-2 bg-green-500 px-5 py-3 rounded-xl text-white"
      >
        <DollarSign size={18} />
        Purchase
      </motion.button>
    </div>
  );
};

export default PurchaseButtons;
