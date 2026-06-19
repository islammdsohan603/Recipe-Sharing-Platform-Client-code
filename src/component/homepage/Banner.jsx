'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-[#0c0604]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#5d240f_0%,#0c0604_60%)]" />

      {/* Decorative Blur */}
      <div className="absolute top-14 left-4 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl sm:left-20 sm:h-72 sm:w-72" />
      <div className="absolute bottom-10 right-0 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl sm:right-10 sm:h-96 sm:w-96" />

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] w-11/12 max-w-7xl items-center py-12 sm:py-16 lg:min-h-[90vh]">
        <div className="grid w-full items-center gap-10 md:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5 text-center md:space-y-6 md:text-left"
          >
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
              Elevate Your
              <br />
              <span className="text-[#ff6d33]">Culinary Journey</span>
            </h1>

            <p className="mx-auto max-w-xl text-sm leading-7 text-[#cdb7aa] sm:text-base md:mx-0 md:text-lg md:leading-8">
              Discover the art of professional cooking from home. Join a global
              community of chefs, explore curated seasonal ingredients, and
              master techniques that transform recipes into unforgettable
              experiences.
            </p>

            <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <Link
                  href="/browse"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#ff6d33] px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(255,109,51,.35)] transition hover:bg-[#ff5a1f] sm:w-auto"
                >
                  Start Cooking
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <Link
                  href="/browse"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-[#4a2b20] px-7 py-3.5 text-white transition hover:bg-white/5 sm:w-auto"
                >
                  Explore Trends
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side Image */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: [0, -15, 0],
              rotate: [-2, 1, -2],
            }}
            transition={{
              opacity: {
                duration: 1,
              },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            className="relative flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[500px]">
              {/* Glow Behind Image */}
              <div className="absolute -inset-6 bg-orange-500/20 blur-3xl rounded-full" />

              {/* Animated Card */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255,109,51,.15)',
                    '0 0 50px rgba(255,109,51,.35)',
                    '0 0 20px rgba(255,109,51,.15)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative rounded-3xl border border-white/10 bg-[#101010] p-2.5 sm:p-3"
              >
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA475wzQrs1OuhziXzT0u68yN703D6-BQKf6E2yZIIBJ32bvpQqLqGORYw4jutXVWekLf221vUmovy3rKyBWQTES9XPKVLgjeDSzeNqCP4VICYNNlmsD07jB-yImkjLJaYApPdj-8oMXGApvB2VWs21DhyM7tygTBmzq3P-Dup9tk-BIJloqH3-wyUQF7l2HbHZ1HRuxOIRgflu4kDJQFpOO1UXwpLni7PzFsAAKy77pBY4LOURzPXEZMWGjwTDp7AV4YgR72vAsQ"
                  alt="Food"
                  width={700}
                  height={700}
                  priority
                  className="aspect-square h-auto w-full rounded-2xl object-cover"
                />

                {/* Badge */}
                <div className="absolute bottom-3 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-md sm:bottom-5 sm:left-5 sm:px-4">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-lime-400 sm:h-3 sm:w-3" />

                  <span className="truncate text-xs text-white sm:text-sm">
                    Top Rated Chef 2024
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
