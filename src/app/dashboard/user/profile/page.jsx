'use client';

import { useSession } from '@/lib/auth-client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { User, Mail, Crown, Shield, Camera, Save, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');

  if (isPending) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
        <p className="text-orange-300/60 text-sm">Loading profile...</p>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <User className="text-orange-400" size={28} />
          My Profile
        </h1>
        <p className="text-orange-300/50 text-sm mt-1">
          Manage your account details
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl"
      >
        {/* Profile Card */}
        <div className="rounded-2xl border border-orange-900/20 bg-[#1a0f0c] overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-orange-500/20 via-amber-500/10 to-orange-500/20 relative">
            <div className="absolute -bottom-10 left-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-[#1a0f0c] shadow-xl">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="pt-14 px-6 pb-6">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-white">{user?.name}</h2>
              {user?.isPremium && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
                  <Crown size={12} className="text-yellow-400" />
                  <span className="text-[10px] font-bold text-yellow-400">PREMIUM</span>
                </span>
              )}
            </div>
            <p className="text-sm text-orange-300/50 mb-6">{user?.email}</p>

            {/* Details Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#110a07] border border-orange-900/20">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <User size={18} className="text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-orange-300/40">Full Name</p>
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#110a07] border border-orange-900/20">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Mail size={18} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-orange-300/40">Email Address</p>
                  <p className="text-sm font-medium text-white">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#110a07] border border-orange-900/20">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Shield size={18} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-orange-300/40">Account Role</p>
                  <p className="text-sm font-medium text-white capitalize">{user?.role || 'user'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#110a07] border border-orange-900/20">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Crown size={18} className="text-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-orange-300/40">Membership</p>
                  <p className="text-sm font-medium text-white">
                    {user?.isPremium ? 'Premium Member' : 'Free Member'}
                  </p>
                </div>
                {!user?.isPremium && (
                  <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-semibold hover:from-yellow-400 hover:to-amber-500 transition-all">
                    Upgrade
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
