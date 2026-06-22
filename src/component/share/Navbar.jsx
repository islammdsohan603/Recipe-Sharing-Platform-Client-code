'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Utensils } from 'lucide-react';

import { authClient, useSession } from '@/lib/auth-client';
import { Avatar } from '@heroui/react';
import { toast } from 'react-toastify';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending, refetch } = useSession();
  const user = session?.user;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Recipes', href: '/browse' },
    ...(user
      ? [
          {
            name: 'Dashboard',
            href: user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/user',
          },
        ]
      : []),
  ];

  const closeMenu = () => setIsOpen(false);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      await refetch?.();
      toast.success('Signed out successfully');
      router.refresh();
      router.replace('/');
    } catch {
      toast.error('Failed to sign out');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1a0f0c] border-b border-orange-950/20">
      <nav className="relative">
        {/* Container */}
        <div className="w-11/12 max-w-7xl mx-auto h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-[#f5dec9]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
              <Utensils size={20} className="text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold">RecipeHub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 transition-colors duration-300 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#f5dec9]/70 hover:text-white'
                  }`}
                >
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-orange-500" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth */}
          {isPending ? (
            <div className="hidden md:flex items-center gap-3 animate-pulse">
              <div className="h-9 w-9 rounded-full bg-orange-200/20" />
              <div className="h-8 w-20 rounded-xl bg-orange-200/20" />
            </div>
          ) : user ? (
            <div className="hidden md:flex items-center gap-2">
              <Avatar>
                <Avatar.Image
                  alt={user?.name}
                  src={user?.image}
                  className=" object-cover cursor-pointer"
                />
                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
              </Avatar>

              <button
                onClick={handleSignOut}
                className="bg-orange-500 px-3 py-1.5 rounded-2xl cursor-pointer hover:bg-orange-600 duration-500 text-white"
              >
                SignOut
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-[#f5dec9]/80 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-orange-500 px-5 py-2.5 font-medium text-white transition hover:bg-orange-600"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="md:hidden text-[#f5dec9]"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X size={28} className="text-orange-600" />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>

        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden"
            onClick={closeMenu}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[#110703] border-t border-orange-950/30 shadow-xl transition-all duration-300 ${
            isOpen
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-2'
          }`}
        >
          <div className="p-5 space-y-3">
            {/* Links */}
            {navLinks.map(link => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`block rounded-xl px-4 py-3 transition ${
                    isActive
                      ? 'bg-orange-500/15 text-white border border-orange-500/30'
                      : 'text-[#f5dec9] hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Auth Mobile */}
            <div className="pt-4 mt-4 border-t border-orange-950/30 space-y-3">
              {isPending ? (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="h-9 w-9 rounded-full bg-orange-200/20" />
                  <div className="h-8 w-20 rounded-xl bg-orange-200/20" />
                </div>
              ) : user ? (
                <div className="flex items-center gap-2">
                  <Avatar>
                    <Avatar.Image alt={user?.name} src={user?.image} />
                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>

                  <button
                    onClick={async () => {
                      await authClient.signOut();
                      toast.success('Signed out successfully');
                      router.refresh();
                      router.push('/');
                      closeMenu();
                    }}
                    className="bg-red-400 px-3 py-1.5 rounded-2xl cursor-pointer hover:bg-red-700 duration-500 text-white"
                  >
                    SignOut
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block text-center rounded-xl py-3 text-[#f5dec9]/80 hover:bg-white/5 transition"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="block text-center rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
