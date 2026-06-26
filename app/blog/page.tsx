"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Eye, Heart, MessageSquare, Tag, ArrowLeft } from "lucide-react";
import { getBlogs, Blog } from "@/services/db";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getBlogs().then(list => {
      // Show only published blogs to public
      setBlogs(list.filter(b => b.status === "published"));
    });
  }, []);

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary-500 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Portfolio
      </Link>

      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-500 font-mono">Academic Insights</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Science & Education Blog
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Articles, guides, and thoughts on Artificial Intelligence, Machine Learning, Pedagogy, and Data Analytics.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-4 rounded-2xl mb-10 border border-slate-200 dark:border-slate-850 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title or tag..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-primary-500 text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Category Toggles */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto py-1 justify-start md:justify-end">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-primary-655 text-white bg-primary-600"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <motion.article
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                key={blog.id}
                className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-850 flex flex-col justify-between h-full group"
              >
                {/* Image header */}
                <div className="relative aspect-[16/10] bg-slate-250 dark:bg-slate-900 overflow-hidden">
                  {blog.featuredImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-tr from-primary-900/10 to-accent-900/10 flex items-center justify-center">
                      <Tag className="h-10 w-10 text-primary-500/50" />
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-primary-600 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                    {blog.category}
                  </span>
                </div>

                {/* Content body */}
                <div className="p-6 flex-grow space-y-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {blog.publishedAt
                        ? new Date(blog.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
                        : "Draft"}
                    </span>
                  </div>
                  
                  <Link href={`/blog/${blog.slug}`}>
                    <h2 className="font-extrabold text-slate-900 dark:text-white text-lg leading-snug group-hover:text-primary-500 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                  </Link>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Stats footer */}
                <div className="px-6 pb-6 pt-4 border-t border-slate-100 dark:border-slate-900/60 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      <span>{blog.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 text-rose-500" />
                      <span>{blog.likes}</span>
                    </div>
                    {blog.comments && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
                        <span>{blog.comments.length}</span>
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="font-bold text-primary-500 group-hover:underline text-xs flex items-center"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-slate-500">
              No blog articles found matching your query.
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
