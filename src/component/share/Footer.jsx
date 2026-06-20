'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Utensils } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Seasonal Harvest', href: '/harvest' },
    { name: 'Chef Community', href: '/community' },
    { name: 'Contact', href: '/contact' },
  ];

  const contacts = [
    { icon: Mail, label: 'islammdsohan603@gmail.com' },
    { icon: Phone, label: '+880 1643223840' },
    { icon: MapPin, label: 'Dhaka, Bangladesh' },
  ];

  const socials = [
    { icon: FaFacebookF, label: 'Facebook', href: 'https://www.facebook.com/' },
    {
      icon: FaInstagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/',
    },
    { icon: FaXTwitter, label: 'X', href: 'https://x.com/' },
  ];

  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-[#090403] text-[#f5dec9]"
    >
      <div className="mx-auto w-11/12 max-w-7xl py-12 sm:py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr] lg:gap-14">
          <div>
            <Link href="#home" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 shadow-[0_0_24px_rgba(249,115,22,0.25)]">
                <Utensils size={21} className="text-white" />
              </span>
              <span className="text-2xl font-bold text-white">RecipeHub</span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#cdb7aa] sm:text-base">
              A refined culinary destination for home cooks who want chef-led
              guidance, seasonal inspiration, and a polished cooking community.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#f5dec9]/80 transition hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-400">
              Quick Links
            </h3>

            <nav className="mt-5 grid gap-3">
              {quickLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-[#cdb7aa] transition hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-400">
              Contact
            </h3>

            <div className="mt-5 grid gap-4">
              {contacts.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-400">
                    <Icon size={17} />
                  </span>
                  <span className="break-words text-sm leading-6 text-[#cdb7aa]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[#cdb7aa] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 RecipeHub. All rights reserved.</p>
          <p>Crafted for modern culinary experiences.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
