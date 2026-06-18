'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-[#0c0604]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#5d240f_0%,#0c0604_60%)]" />

      {/* Decorative Blur */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />

      <div className="relative w-11/12 max-w-7xl mx-auto h-[85vh] md:h-[90vh] flex items-center">
        <div className="grid md:grid-cols-2 gap-16 items-center w-full">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
              Elevate Your
              <br />
              <span className="text-[#ff6d33]">Culinary Journey</span>
            </h1>

            <p className="max-w-xl text-[#cdb7aa] text-base md:text-lg leading-8">
              Discover the art of professional cooking from home. Join a global
              community of chefs, explore curated seasonal ingredients, and
              master techniques that transform recipes into unforgettable
              experiences.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="bg-[#ff6d33] hover:bg-[#ff5a1f] text-white px-8 py-4 rounded-xl font-semibold shadow-[0_0_30px_rgba(255,109,51,.35)] transition"
              >
                Start Cooking
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="border border-[#4a2b20] text-white px-8 py-4 rounded-xl hover:bg-white/5 transition"
              >
                Explore Trends
              </motion.button>
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
            className="relative flex justify-center"
          >
            <div className="relative w-[320px] sm:w-[380px] md:w-[500px]">
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
                className="relative rounded-3xl border border-white/10 bg-[#101010] p-3"
              >
                <Image
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200"
                  alt="Food"
                  width={700}
                  height={700}
                  priority
                  className="rounded-2xl object-cover w-full h-full"
                />

                {/* Badge */}
                <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-lime-400" />

                  <span className="text-white text-sm">
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
