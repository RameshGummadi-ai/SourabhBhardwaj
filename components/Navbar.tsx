"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, User, Award, Phone, Rss, Briefcase, GraduationCap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "About", href: "/#about", icon: User },
  { name: "Experience", href: "/#experience", icon: Briefcase },
  { name: "Education", href: "/#education", icon: GraduationCap },
  { name: "Skills", href: "/#skills", icon: Award },
  { name: "Research", href: "/#research", icon: BookOpen },
  { name: "Blog", href: "/blog", icon: Rss },
  { name: "Contact", href: "/#contact", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 glass-panel shadow-md shadow-slate-900/5 dark:shadow-black/20"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-200">
                SB
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  Sourabh Bhardwaj
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Assistant Professor
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/blog" && pathname === "/" && typeof window !== "undefined" && window.location.hash === link.href.substring(1));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-900 ${
                    isActive
                      ? "text-primary-600 dark:text-primary-400 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />
            <ThemeToggle />
            <Link
              href="/admin"
              className="ml-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-primary-600 dark:hover:bg-primary-400 dark:hover:text-white transition-colors duration-200"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                  >
                    <IconComponent className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    {link.name}
                  </Link>
                );
              })}
              <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-2">
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-center transition-colors shadow-md shadow-primary-500/20"
                >
                  Admin Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
