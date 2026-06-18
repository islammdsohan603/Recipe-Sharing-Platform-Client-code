'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Community = () => {
  const features = [
    'Weekly live masterclasses',
    'Exclusive professional cooking guides',
    'Networking with expert chefs',
    'Personalized recipe collections',
  ];

  const images = ['/image1.jpg', '/cheaf.webp', '/image3.jpg', '/image4.webp'];

  return (
    <section id="community" className="overflow-hidden bg-[#0c0604] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-11/12 max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side Images */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:order-first"
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3 + index,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`
                  overflow-hidden
                  rounded-xl sm:rounded-2xl
                  border border-white/10
                  bg-[#141414]
                  shadow-xl
                  ${index % 2 === 0 ? 'translate-y-5 sm:translate-y-8' : ''}
                `}
              >
                <Image
                  src={img}
                  alt="Chef"
                  width={400}
                  height={500}
                  className="h-[150px] w-full object-cover transition duration-700 hover:scale-110 sm:h-[220px] md:h-[260px]"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <span className="inline-block rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
              Premium Membership
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Join Our Chef
              <span className="block text-[#ff6d33]">Community</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#cdb7aa] sm:text-base sm:leading-8 lg:mx-0">
              Become part of an exclusive culinary network. Learn from industry
              experts, discover advanced cooking techniques, and connect with
              passionate food enthusiasts worldwide.
            </p>

            <div className="mx-auto mt-8 max-w-xl space-y-4 text-left lg:mx-0">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.15,
                  }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />

                  <span className="text-[#f5dec9]">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="mt-10 w-full rounded-xl bg-[#ff6d33] px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(255,109,51,.35)] transition hover:bg-[#ff5a1f] sm:w-auto"
            >
              Join the Guild
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Community;
