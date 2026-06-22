'use client';

import { DollarSign, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import StripeCheckoutWrapper from '../StripeCheckout';
import { useSession } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const PurchaseButtons = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);

  const handlePurchaseClick = () => {
    if (!session?.user) {
      toast.error("Please login to purchase premium.");
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePurchaseClick}
        className="flex items-center cursor-pointer gap-2 bg-green-500 px-5 py-3 rounded-xl text-white"
      >
        <DollarSign size={18} />
        Purchase Premium
      </motion.button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-[#101010] p-6 shadow-2xl border border-white/10">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-white mb-4">Upgrade to Premium</h2>
            <p className="text-sm text-gray-400 mb-6">
              Unlock unlimited recipe creation for just $10.
            </p>
            <StripeCheckoutWrapper
              userEmail={session?.user?.email}
              onSuccess={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PurchaseButtons;
