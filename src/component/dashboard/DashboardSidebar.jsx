'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Heart,
  ShoppingBag,
  User,
  Users,
  ChefHat,
  BarChart3,
  Crown,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === 'admin';
  const [mobileOpen, setMobileOpen] = useState(false);

  const userLinks = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/user' },
    { icon: PlusCircle, label: 'Add Recipe', href: '/dashboard/user/add-recipe' },
    { icon: BookOpen, label: 'My Recipes', href: '/dashboard/user/my-recipes' },
    { icon: Heart, label: 'My Favorites', href: '/dashboard/user/my-favorites' },
    { icon: ShoppingBag, label: 'Purchased Recipes', href: '/dashboard/user/purchased' },
    { icon: User, label: 'Profile', href: '/dashboard/user/profile' },
  ];

  const adminLinks = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/admin' },
    { icon: Users, label: 'Manage Users', href: '/dashboard/admin/manage-users' },
    { icon: ChefHat, label: 'Manage Recipes', href: '/dashboard/admin/manage-recipes' },
    { icon: BarChart3, label: 'Reports', href: '/dashboard/admin/reports' },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  const navContent = (
    <div className="flex flex-col h-full">
      {/* User Info */}
      <div className="p-5 border-b border-orange-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-orange-300/60">
                {isAdmin ? 'Admin' : 'Member'}
              </span>
              {user?.isPremium && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
                  <Crown size={10} className="text-yellow-400" />
                  <span className="text-[10px] font-bold text-yellow-400">PRO</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-orange-400/50">
          {isAdmin ? 'Admin Panel' : 'Dashboard'}
        </p>
        {links.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-orange-100/70 hover:bg-orange-500/10 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      {!isAdmin && (
        <div className="p-4 border-t border-orange-900/30">
          <Link
            href="/dashboard/admin"
            className="hidden"
          >
            Admin
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-orange-500 text-white p-3 rounded-full shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#1a0f0c] border-r border-orange-900/30 z-50 transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-orange-300/60 hover:text-white"
        >
          <X size={20} />
        </button>
        {navContent}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-[#1a0f0c] border-r border-orange-900/30 rounded-l-2xl overflow-hidden">
        {navContent}
      </aside>
    </>
  );
};

export default DashboardSidebar;
