"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Eye, Heart, MessageSquare, Tag, User, Send } from "lucide-react";
import { getBlogBySlug, likeBlog, addComment, Blog, Comment } from "@/services/db";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Comment Form States
  const [commentForm, setCommentForm] = useState({ name: "", email: "", content: "" });
  const [commentStatus, setCommentStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [commentsList, setCommentsList] = useState<Comment[]>([]);

  useEffect(() => {
    getBlogBySlug(params.slug).then(post => {
      if (post) {
        setBlog(post);
        setLikesCount(post.likes);
        setCommentsList(post.comments || []);
      }
      setLoading(false);
    });
  }, [params.slug]);

  const handleLike = async () => {
    if (liked) return; // Prevent double liking
    try {
      const newLikes = await likeBlog(params.slug);
      setLikesCount(newLikes);
      setLiked(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentStatus("sending");
    try {
      const newComment = await addComment(params.slug, {
        authorName: commentForm.name,
        authorEmail: commentForm.email,
        content: commentForm.content
      });
      setCommentsList([...commentsList, newComment]);
      setCommentForm({ name: "", email: "", content: "" });
      setCommentStatus("success");
      setTimeout(() => setCommentStatus("idle"), 3000);
    } catch {
      setCommentStatus("error");
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center text-slate-500">
        Loading blog article...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-32 pb-20 max-w-md mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blog Article Not Found</h1>
        <p className="text-sm text-slate-500">The article you are looking for might have been removed or renamed.</p>
        <Link
          href="/blog"
          className="inline-block px-5 py-2 rounded-xl bg-primary-600 text-white font-semibold text-xs"
        >
          Return to Blog List
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary-500 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog List
      </Link>

      {/* Main post layout */}
      <article className="space-y-6">
        
        {/* Category & Date */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-primary-600 dark:text-primary-400">
          <span className="bg-primary-50 dark:bg-primary-950/40 px-3 py-1 rounded-full uppercase tracking-wider">
            {blog.category}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-350 dark:bg-slate-700" />
          <div className="flex items-center gap-1 font-normal text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {blog.publishedAt
                ? new Date(blog.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
                : "Draft"}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
          {blog.title}
        </h1>

        {/* Engagement stats */}
        <div className="flex items-center justify-between border-y border-slate-100 dark:border-slate-900 py-3 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{blog.views} Views</span>
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{commentsList.length} Comments</span>
            </span>
          </div>
          
          <button
            onClick={handleLike}
            disabled={liked}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
              liked
                ? "bg-rose-50 border-rose-100 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/40"
                : "border-slate-200 hover:border-rose-300 dark:border-slate-800 hover:text-rose-500"
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
            <span>{likesCount} Likes</span>
          </button>
        </div>

        {/* Featured image */}
        {blog.featuredImage && (
          <div className="relative aspect-[2/1] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-850">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Markdown Content render */}
        <div className="prose prose-slate dark:prose-invert max-w-none py-4 text-slate-800 dark:text-slate-300 leading-relaxed text-sm space-y-4">
          <ReactMarkdown className="markdown-body space-y-4">
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-900 pt-6">
            {blog.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-xl text-xs text-slate-600 dark:text-slate-400">
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Comment Section Panel */}
      <section className="mt-16 border-t border-slate-200 dark:border-slate-900 pt-12 space-y-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary-500" />
          Comments ({commentsList.length})
        </h2>

        {/* List of comments */}
        <div className="space-y-4">
          {commentsList.length > 0 ? (
            commentsList.map(comment => (
              <div key={comment.id} className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-850 flex gap-4 text-left">
                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-550 flex-shrink-0">
                  <User className="h-5 w-5" />
                </div>
                <div className="space-y-1 flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{comment.authorName}</span>
                    <span className="text-[10px] text-slate-405 font-mono">
                      {new Date(comment.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs italic text-slate-500">No comments yet. Be the first to start the discussion!</p>
          )}
        </div>

        {/* Add comment form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-850">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">Post a Comment</h3>
          
          <form onSubmit={handleCommentSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-350">Name</label>
                <input
                  required
                  type="text"
                  value={commentForm.name}
                  onChange={e => setCommentForm({ ...commentForm, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs text-slate-800 dark:text-slate-100 focus:border-primary-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-350">Email Address</label>
                <input
                  required
                  type="email"
                  value={commentForm.email}
                  onChange={e => setCommentForm({ ...commentForm, email: e.target.value })}
                  placeholder="Your Email (Private)"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs text-slate-800 dark:text-slate-100 focus:border-primary-500"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-350">Comment</label>
              <textarea
                required
                value={commentForm.content}
                onChange={e => setCommentForm({ ...commentForm, content: e.target.value })}
                rows={4}
                placeholder="Share your thoughts about this article..."
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-xs text-slate-800 dark:text-slate-100 focus:border-primary-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={commentStatus === "sending"}
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors text-xs disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{commentStatus === "sending" ? "Posting..." : "Submit Comment"}</span>
            </button>

            {commentStatus === "success" && (
              <p className="text-xs text-emerald-500 font-semibold mt-1">Comment posted successfully!</p>
            )}
            {commentStatus === "error" && (
              <p className="text-xs text-red-500 font-semibold mt-1">Failed to post comment. Try again.</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
