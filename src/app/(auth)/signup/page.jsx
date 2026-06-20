'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { FiImage } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';
import { authClient } from '@/lib/auth-client';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('user');

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const users = Object.fromEntries(formData.entries());

    const passwordValue = users.password;

    if (passwordValue.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    if (!/[A-Z]/.test(passwordValue)) {
      return setError('Password must contain at least one uppercase letter.');
    }

    if (!/[a-z]/.test(passwordValue)) {
      return setError('Password must contain at least one lowercase letter.');
    }

    const { data, error } = await authClient.signUp.email({
      name: users.name,
      email: users.email,
      password: passwordValue,
      image: users.image,
      role: role,
    });

    if (data) {
      toast.success('Account successfully created.');
      router.push('/login');
    }

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0c0604] px-4 py-10 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#5d240f_0%,#0c0604_52%)]" />
      <div className="absolute left-4 top-16 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl sm:left-20 sm:h-72 sm:w-72" />
      <div className="absolute bottom-10 right-0 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl sm:right-10 sm:h-96 sm:w-96" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-[#120906]/85 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-orange-400">
              RecipeHub
            </p>

            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Create Account
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#cdb7aa]">
              Join our chef community and start your culinary journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cdb7aa]" />

              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                className="w-full rounded-xl border border-white/10 bg-[#1a0f0c]/80 py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-[#cdb7aa]/65 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="relative">
              <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#cdb7aa]" />

              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                className="w-full rounded-xl border border-white/10 bg-[#1a0f0c]/80 py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-[#cdb7aa]/65 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="relative">
              <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#cdb7aa]" />

              <input
                type="url"
                name="image"
                placeholder="Photo URL"
                className="w-full rounded-xl border border-white/10 bg-[#1a0f0c]/80 py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-[#cdb7aa]/65 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border border-white/10 bg-[#1a0f0c]/80 py-3 pl-4 pr-12 text-white outline-none transition placeholder:text-[#cdb7aa]/65 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#cdb7aa] transition hover:text-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#1a0f0c]/70 p-4">
              <p className="mb-2 text-sm text-white">Password Requirements</p>

              <div className="space-y-1 text-xs">
                <p
                  className={
                    password.length >= 6 ? 'text-orange-300' : 'text-[#cdb7aa]'
                  }
                >
                  - Minimum 6 characters
                </p>

                <p
                  className={
                    /[A-Z]/.test(password)
                      ? 'text-orange-300'
                      : 'text-[#cdb7aa]'
                  }
                >
                  - One uppercase letter
                </p>

                <p
                  className={
                    /[a-z]/.test(password)
                      ? 'text-orange-300'
                      : 'text-[#cdb7aa]'
                  }
                >
                  - One lowercase letter
                </p>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* role */}

            <div>
              <label className="mb-3 block text-sm font-medium text-white">
                Select Role
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === 'user'}
                    onChange={e => setRole(e.target.value)}
                    defaultChecked
                    className="peer hidden"
                  />

                  <div className="rounded-xl border border-white/10 bg-[#1a0f0c]/80 p-4 transition-all duration-300 peer-checked:border-orange-500 peer-checked:bg-orange-500/10 peer-checked:ring-2 peer-checked:ring-orange-500/20 hover:border-orange-400">
                    <h3 className="font-semibold text-white">👨‍🍳 User</h3>

                    <p className="mt-1 text-xs text-[#cdb7aa]">
                      Browse recipes, like, favorite and share.
                    </p>
                  </div>
                </label>

                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={e => setRole(e.target.value)}
                    className="peer hidden"
                  />

                  <div className="rounded-xl border border-white/10 bg-[#1a0f0c]/80 p-4 transition-all duration-300 peer-checked:border-orange-500 peer-checked:bg-orange-500/10 peer-checked:ring-2 peer-checked:ring-orange-500/20 hover:border-orange-400">
                    <h3 className="font-semibold text-white">🛡️ Admin</h3>

                    <p className="mt-1 text-xs text-[#cdb7aa]">
                      Manage recipes, users and platform content.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#ff6d33] py-3 font-semibold text-white shadow-[0_0_30px_rgba(255,109,51,.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#ff5a1f]"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#cdb7aa]">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-orange-400 transition hover:text-orange-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
