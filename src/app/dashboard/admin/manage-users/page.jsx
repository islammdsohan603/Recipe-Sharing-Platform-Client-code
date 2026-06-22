'use client';

import { useEffect, useState } from 'react';
import { getAllUsers, updateUser, deleteUser } from '@/db/recipe';
import { toast } from 'react-toastify';
import {
  Users,
  Search,
  Crown,
  Shield,
  Trash2,
  Loader2,
  UserCheck,
  UserX,
} from 'lucide-react';
import { motion } from 'framer-motion';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTogglePremium = async (userId, currentStatus) => {
    setActionLoading(userId + '-premium');
    const result = await updateUser(userId, { isPremium: !currentStatus });
    if (result?.modifiedCount > 0) {
      toast.success(`Premium status ${!currentStatus ? 'granted' : 'revoked'}`);
      fetchUsers();
    } else {
      toast.error('Failed to update user');
    }
    setActionLoading(null);
  };

  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    setActionLoading(userId + '-role');
    const result = await updateUser(userId, { role: newRole });
    if (result?.modifiedCount > 0) {
      toast.success(`Role changed to ${newRole}`);
      fetchUsers();
    } else {
      toast.error('Failed to update role');
    }
    setActionLoading(null);
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    setActionLoading(userId + '-delete');
    const result = await deleteUser(userId);
    if (result?.deletedCount > 0) {
      toast.success('User deleted successfully');
      setUsers(users.filter((u) => u._id !== userId));
    } else {
      toast.error('Failed to delete user');
    }
    setActionLoading(null);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
        <p className="text-orange-300/60 text-sm">Loading users...</p>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Users className="text-blue-400" size={28} />
            Manage Users
          </h1>
          <p className="text-orange-300/50 text-sm mt-1">
            {users.length} registered user{users.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400/40" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#1a0f0c] border border-orange-900/30 text-white text-sm placeholder-orange-300/30 focus:outline-none focus:border-orange-500/50 transition-all"
          />
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-orange-900/20 bg-[#1a0f0c] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-orange-900/20">
                <th className="text-left px-6 py-4 text-xs font-semibold text-orange-300/50 uppercase tracking-wider">
                  User
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-orange-300/50 uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-orange-300/50 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-orange-300/50 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-900/10">
              {filteredUsers.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-orange-500/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {u.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {u.name}
                        </p>
                        <p className="text-xs text-orange-300/40 truncate">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        u.role === 'admin'
                          ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                          : 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      <Shield size={10} />
                      {u.role || 'user'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {u.isPremium ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 text-xs font-medium">
                        <Crown size={10} />
                        Premium
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-500/15 text-gray-400 border border-gray-500/20 text-xs font-medium">
                        Free
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleTogglePremium(u._id, u.isPremium)}
                        disabled={actionLoading === u._id + '-premium'}
                        className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors disabled:opacity-50"
                        title={u.isPremium ? 'Revoke Premium' : 'Grant Premium'}
                      >
                        {actionLoading === u._id + '-premium' ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Crown size={14} />
                        )}
                      </button>
                      <button
                        onClick={() => handleToggleRole(u._id, u.role)}
                        disabled={actionLoading === u._id + '-role'}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors disabled:opacity-50"
                        title={u.role === 'admin' ? 'Make User' : 'Make Admin'}
                      >
                        {actionLoading === u._id + '-role' ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : u.role === 'admin' ? (
                          <UserX size={14} />
                        ) : (
                          <UserCheck size={14} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(u._id)}
                        disabled={actionLoading === u._id + '-delete'}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        title="Delete User"
                      >
                        {actionLoading === u._id + '-delete' ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users size={36} className="mx-auto text-orange-400/30 mb-3" />
            <p className="text-orange-300/50">No users found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageUsersPage;
