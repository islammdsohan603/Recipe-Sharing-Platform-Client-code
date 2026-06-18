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
    <section className="bg-[#0c0604] py-24 overflow-hidden">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side Images */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
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
                  rounded-2xl
                  border border-white/10
                  bg-[#141414]
                  shadow-xl
                  ${index % 2 === 0 ? 'translate-y-8' : ''}
                `}
              >
                <Image
                  src={img}
                  alt="Chef"
                  width={400}
                  height={500}
                  className="h-[220px] md:h-[260px] w-full object-cover hover:scale-110 transition duration-700"
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
          >
            <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
              Premium Membership
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white leading-tight">
              Join Our Chef
              <span className="block text-[#ff6d33]">Community</span>
            </h2>

            <p className="mt-6 text-[#cdb7aa] leading-8 max-w-xl">
              Become part of an exclusive culinary network. Learn from industry
              experts, discover advanced cooking techniques, and connect with
              passionate food enthusiasts worldwide.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.15,
                  }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-orange-400" />

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
              className="mt-10 bg-[#ff6d33] hover:bg-[#ff5a1f] text-white px-8 py-4 rounded-xl font-semibold shadow-[0_0_30px_rgba(255,109,51,.35)]"
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
