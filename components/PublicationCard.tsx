"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, ChevronDown, ChevronUp, ExternalLink, FileText } from "lucide-react";
import { Publication } from "@/services/dataSeed";

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-4 text-left border border-slate-200 dark:border-slate-800"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary-600 dark:text-primary-400">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Journal Paper</span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{publication.year}</span>
            </div>
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-snug">
            {publication.title}
          </h3>
        </div>
      </div>

      {/* Author formatting */}
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {publication.authors.map((author, index) => {
          const isSourabh = author.includes("Sourabh Bhardwaj");
          return (
            <span key={author}>
              <span className={isSourabh ? "font-bold text-slate-900 dark:text-white underline decoration-primary-500/50 decoration-2" : ""}>
                {author}
              </span>
              {index < publication.authors.length - 1 ? ", " : ""}
            </span>
          );
        })}
      </p>

      {/* Journal Information */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-t border-slate-100 dark:border-slate-900 pt-3">
        <span className="font-medium text-slate-500 dark:text-slate-400 italic">
          {publication.journal}
        </span>
        {publication.doi && (
          <span className="bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-lg font-mono">
            DOI: {publication.doi}
          </span>
        )}
      </div>

      {/* Expandable Abstract */}
      {publication.abstract && (
        <div className="mt-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none transition-colors"
          >
            {isOpen ? (
              <>
                <span>Hide Abstract</span>
                <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                <span>View Abstract</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-900/60">
                  {publication.abstract}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 mt-2">
        <a
          href={publication.link || "https://scholar.google.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-primary-50 dark:hover:bg-primary-950/30 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          <span>Google Scholar</span>
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-primary-55/30 dark:hover:bg-primary-955/30 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <FileText className="h-3 w-3" />
          <span>Research Paper PDF</span>
        </a>
      </div>
    </motion.div>
  );
}
