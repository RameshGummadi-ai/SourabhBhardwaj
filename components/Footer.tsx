"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Youtube, ArrowUp, Users } from "lucide-react";
import { getVisitorStats, incrementVisitorStats } from "@/services/db";

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    // Record page load visit
    incrementVisitorStats().then(() => {
      getVisitorStats().then(stats => {
        setVisitorCount(stats.visitors || 0);
      });
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-900/10 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary-900/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Bio Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-lg bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold text-base">
                SB
              </span>
              <span className="text-white font-bold text-lg leading-tight tracking-tight">
                Sourabh Bhardwaj
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Assistant Professor and AI Researcher. Educating future technologists and pioneering data innovations.
            </p>
            {/* Real Visitor Counter Widget */}
            <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2 w-fit">
              <Users className="h-4 w-4 text-secondary-500 animate-pulse" />
              <span className="text-xs text-slate-300 font-medium">
                Visitor Counter: <span className="text-white font-bold">{visitorCount}</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#about" className="hover:text-primary-400 transition-colors">
                  About Journey
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-primary-400 transition-colors">
                  Experience & Timeline
                </Link>
              </li>
              <li>
                <Link href="/#research" className="hover:text-primary-400 transition-colors">
                  Research Publications
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">
                  Academic Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-primary-400 transition-colors">
                  Contact Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Credentials</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Junior Research Fellow (JRF)</li>
              <li>• UGC-NET Qualified</li>
              <li>• GATE CSIT Qualified (2021, 2026)</li>
              <li>• GATE DSAI Qualified (2026)</li>
              <li>• B.Sc. (Maths Hons) - Delhi University</li>
              <li>• MCA (Hons) - Bundelkhand University</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Get In Touch</h3>
            <div className="flex items-center gap-3 text-sm hover:text-white transition-colors">
              <Mail className="h-4 w-4 text-primary-500" />
              <a href="mailto:Sourabh7796@gmail.com">Sourabh7796@gmail.com</a>
            </div>
            <div className="flex items-center gap-3 text-sm hover:text-white transition-colors">
              <Phone className="h-4 w-4 text-secondary-500" />
              <a href="tel:+919891605943">+91 9891605943</a>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-4 w-4 text-accent-500 mt-0.5" />
              <span>Ghaziabad, Uttar Pradesh, India</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Sourabh Bhardwaj. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-primary-600 hover:text-white text-slate-400 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-primary-600 hover:text-white text-slate-400 transition-all duration-200"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-secondary-600 hover:text-white text-slate-400 transition-all duration-200 ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
