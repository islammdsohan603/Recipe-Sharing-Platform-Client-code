import { Flag } from 'lucide-react';
import { motion } from 'framer-motion';

const ReportButtons = () => {
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center cursor-pointer gap-2 bg-red-500 px-5 py-3 rounded-xl text-white"
      >
        <Flag size={18} />
        Report
      </motion.button>
    </div>
  );
};

export default ReportButtons;
