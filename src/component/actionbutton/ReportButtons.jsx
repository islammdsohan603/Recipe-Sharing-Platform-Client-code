'use client';

import { AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import api from '@/lib/api';
import { toast } from 'react-toastify';
import { useSession } from '@/lib/auth-client';

const ReportButtons = ({ recipeId }) => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('Spam');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReportClick = () => {
    if (!session?.user) {
      toast.error("Please login to report a recipe.");
      return;
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/api/reports', {
        recipeId,
        reporterEmail: session.user.email,
        reason,
      });
      toast.success("Report submitted successfully.");
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to submit report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleReportClick}
        className="flex items-center cursor-pointer gap-2 bg-red-500 px-5 py-3 rounded-xl text-white"
      >
        <AlertTriangle size={18} />
        Report
      </motion.button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-[#101010] p-6 shadow-2xl border border-white/10 text-white">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Report Recipe</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="text-sm text-gray-300">Reason for reporting:</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-lg bg-[#202020] border border-gray-700 p-3 text-white focus:outline-none focus:border-red-500"
              >
                <option value="Spam">Spam</option>
                <option value="Offensive Content">Offensive Content</option>
                <option value="Copyright Issue">Copyright Issue</option>
              </select>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportButtons;
