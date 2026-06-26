"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart2,
  BookOpen,
  Briefcase,
  FileText,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";
import { isAuthenticated, logout } from "@/services/auth";
import {
  getBlogs,
  saveBlog,
  deleteBlog,
  getProjects,
  saveProject,
  deleteProject,
  getPublications,
  savePublication,
  deletePublication,
  getMessages,
  deleteMessage,
  getVisitorStats,
  Blog,
  Project,
  Publication,
  ContactMessage
} from "@/services/db";

type Tab = "analytics" | "blogs" | "projects" | "publications" | "messages";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("analytics");
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  // Data States
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState({ visitors: 0, totalBlogViews: 0, totalMessages: 0 });

  // Modal / Form States
  const [blogForm, setBlogForm] = useState<Partial<Blog> | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project> | null>(null);
  const [pubForm, setPubForm] = useState<Partial<Publication> | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin");
    } else {
      setAuthorized(true);
      loadAllData();
    }
  }, [router]);

  const loadAllData = async () => {
    const [b, p, pub, m, s] = await Promise.all([
      getBlogs(),
      getProjects(),
      getPublications(),
      getMessages(),
      getVisitorStats()
    ]);
    setBlogs(b);
    setProjects(p);
    setPublications(pub);
    setMessages(m);
    setStats(s);
  };

  const handleSignOut = () => {
    logout();
    router.push("/admin");
  };

  // Blog CRUD
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm || !blogForm.title) return;
    
    const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    const fullBlog: Blog = {
      id: blogForm.id || "blog_" + Date.now(),
      title: blogForm.title,
      slug,
      content: blogForm.content || "",
      excerpt: blogForm.excerpt || "",
      category: blogForm.category || "AI & Education",
      tags: blogForm.tags || ["Research"],
      status: blogForm.status || "published",
      createdAt: blogForm.createdAt || new Date().toISOString(),
      publishedAt: blogForm.status === "published" ? new Date().toISOString() : undefined,
      views: blogForm.views || 0,
      likes: blogForm.likes || 0,
      featuredImage: blogForm.featuredImage || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      comments: blogForm.comments || []
    };

    await saveBlog(fullBlog);
    setBlogForm(null);
    loadAllData();
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      await deleteBlog(id);
      loadAllData();
    }
  };

  // Project CRUD
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm || !projectForm.title) return;

    const fullProject: Project = {
      id: projectForm.id || "proj_" + Date.now(),
      title: projectForm.title,
      description: projectForm.description || "",
      techStack: typeof projectForm.techStack === "string" 
        ? (projectForm.techStack as string).split(",").map(t => t.trim()) 
        : projectForm.techStack || [],
      demo: projectForm.demo || "",
      imageUrl: projectForm.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
    };

    await saveProject(fullProject);
    setProjectForm(null);
    loadAllData();
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      loadAllData();
    }
  };

  // Publication CRUD
  const handleSavePub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubForm || !pubForm.title) return;

    const fullPub: Publication = {
      id: pubForm.id || "pub_" + Date.now(),
      title: pubForm.title,
      authors: typeof pubForm.authors === "string"
        ? (pubForm.authors as string).split(",").map(a => a.trim())
        : pubForm.authors || [],
      journal: pubForm.journal || "International Journal of Science, Technology and Management",
      year: Number(pubForm.year) || new Date().getFullYear(),
      doi: pubForm.doi || "",
      abstract: pubForm.abstract || ""
    };

    await savePublication(fullPub);
    setPubForm(null);
    loadAllData();
  };

  const handleDeletePub = async (id: string) => {
    if (confirm("Are you sure you want to delete this research publication?")) {
      await deletePublication(id);
      loadAllData();
    }
  };

  // Message CRUD
  const handleDeleteMessage = async (id: string) => {
    if (confirm("Delete this message?")) {
      await deleteMessage(id);
      loadAllData();
    }
  };

  if (!authorized) return null;

  return (
    <div className="pt-20 min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary-500">
            <ArrowLeft className="h-4 w-4" />
            Live Website
          </Link>
          <button
            onClick={handleSignOut}
            className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-red-50 hover:text-red-500 text-slate-500 transition-colors"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-1">
          <h2 className="font-bold text-base text-slate-900 dark:text-white leading-tight">Prof. Sourabh</h2>
          <p className="text-[10px] text-slate-400 font-mono">Control Dashboard</p>
        </div>

        <nav className="space-y-1">
          {[
            { id: "analytics", name: "Analytics Info", icon: BarChart2 },
            { id: "blogs", name: "Manage Blogs", icon: FileText },
            { id: "projects", name: "Manage Projects", icon: Briefcase },
            { id: "publications", name: "Publications", icon: BookOpen },
            { id: "messages", name: "Contact Mailbox", icon: Mail }
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left ${
                  activeTab === item.id
                    ? "bg-primary-600 text-white"
                    : "text-slate-655 dark:text-slate-355 hover:bg-slate-100 dark:hover:bg-slate-950"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Panel Area */}
      <main className="flex-grow p-6 sm:p-8 space-y-6 max-w-6xl mx-auto w-full overflow-x-hidden">
        
        {/* TAB 1: ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Analytics Overview</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-850 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-mono">Unique Visitors</span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.visitors}</div>
                <p className="text-[10px] text-emerald-500 font-semibold">Simulated real-time stats</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-850 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-mono">Total Blog Reads</span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.totalBlogViews}</div>
                <p className="text-[10px] text-primary-500 font-semibold">Across all publications</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-850 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-mono">Feedback Messages</span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.totalMessages}</div>
                <p className="text-[10px] text-secondary-500 font-semibold">Saved in Database</p>
              </div>
            </div>

            {/* Popular Blogs */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-250 dark:border-slate-850 space-y-4">
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">Top Read Blog Posts</h2>
              <div className="space-y-3">
                {blogs.slice(0, 3).map(b => (
                  <div key={b.id} className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-4 rounded-xl text-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{b.title}</div>
                      <div className="text-slate-400 mt-0.5">{b.category}</div>
                    </div>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1 font-mono"><Eye className="h-3.5 w-3.5" />{b.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BLOGS CRUD */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Blog Publications</h1>
              <button
                onClick={() => setBlogForm({})}
                className="flex items-center gap-1 px-4 py-2 bg-primary-600 text-white rounded-xl font-bold text-xs shadow-md shadow-primary-500/25 hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Write Blog</span>
              </button>
            </div>

            {/* Blogs Table */}
            <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-850 overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-mono border-b border-slate-200 dark:border-slate-850">
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Reads / Likes</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                  {blogs.map(blog => (
                    <tr key={blog.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{blog.title}</td>
                      <td className="p-4">{blog.category}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          blog.status === "published" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20" : "bg-amber-50 text-amber-600 dark:bg-amber-950/20"
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono">{blog.views} / {blog.likes}</td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => setBlogForm(blog)}
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-655"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="p-1.5 rounded bg-slate-100 hover:bg-red-50 dark:bg-slate-950 dark:hover:bg-red-950/20 text-red-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Blog Form Modal */}
            {blogForm && (
              <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-850 p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-3">
                    <h2 className="font-bold text-base text-slate-900 dark:text-white">
                      {blogForm.id ? "Edit Blog Article" : "Create Blog Article"}
                    </h2>
                    <button onClick={() => setBlogForm(null)} className="text-slate-400 hover:text-slate-900">
                      Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveBlog} className="space-y-4 text-left text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 dark:text-slate-350">Title</label>
                        <input
                          required
                          type="text"
                          value={blogForm.title || ""}
                          onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 dark:text-slate-350">Category</label>
                        <input
                          required
                          type="text"
                          value={blogForm.category || ""}
                          onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
                          placeholder="e.g. AI & Education, Data Science"
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-350">Excerpt (Short Description)</label>
                      <textarea
                        required
                        value={blogForm.excerpt || ""}
                        onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 dark:text-slate-350">Featured Image URL</label>
                        <input
                          type="text"
                          value={blogForm.featuredImage || ""}
                          onChange={e => setBlogForm({ ...blogForm, featuredImage: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 dark:text-slate-350">Status</label>
                        <select
                          value={blogForm.status || "published"}
                          onChange={e => setBlogForm({ ...blogForm, status: e.target.value as "draft" | "published" })}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-350">Markdown Content</label>
                      <RichTextEditor
                        value={blogForm.content || ""}
                        onChange={val => setBlogForm({ ...blogForm, content: val })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all text-xs"
                    >
                      Save Article
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROJECTS CRUD */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Dynamic Projects</h1>
              <button
                onClick={() => setProjectForm({})}
                className="flex items-center gap-1 px-4 py-2 bg-primary-600 text-white rounded-xl font-bold text-xs shadow-md shadow-primary-500/25 hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(proj => (
                <div key={proj.id} className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-850 flex justify-between gap-4 text-left">
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{proj.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map(stack => (
                        <span key={stack} className="bg-slate-100 dark:bg-slate-950 text-slate-500 text-[10px] px-2 py-0.5 rounded">
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-start flex-shrink-0">
                    <button
                      onClick={() => setProjectForm(proj)}
                      className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-655"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1.5 rounded bg-slate-100 hover:bg-red-50 dark:bg-slate-950 dark:hover:bg-red-955/20 text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Modal */}
            {projectForm && (
              <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-850 p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-3">
                    <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                      {projectForm.id ? "Edit Project Details" : "Add Project Details"}
                    </h2>
                    <button onClick={() => setProjectForm(null)} className="text-slate-400 hover:text-slate-900">
                      Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-4 text-left text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-350">Project Title</label>
                      <input
                        required
                        type="text"
                        value={projectForm.title || ""}
                        onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-350">Description</label>
                      <textarea
                        required
                        value={projectForm.description || ""}
                        onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-350">Tech Stack (comma separated)</label>
                      <input
                        required
                        type="text"
                        value={Array.isArray(projectForm.techStack) ? projectForm.techStack.join(", ") : projectForm.techStack || ""}
                        onChange={e => setProjectForm({ ...projectForm, techStack: e.target.value })}
                        placeholder="Python, Streamlit, Pandas"
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 dark:text-slate-350">Demo Link</label>
                        <input
                          type="text"
                          value={projectForm.demo || ""}
                          onChange={e => setProjectForm({ ...projectForm, demo: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all text-xs"
                    >
                      Save Project
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PUBLICATIONS CRUD */}
        {activeTab === "publications" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Research Publications</h1>
              <button
                onClick={() => setPubForm({})}
                className="flex items-center gap-1 px-4 py-2 bg-primary-600 text-white rounded-xl font-bold text-xs shadow-md shadow-primary-500/25 hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Publication</span>
              </button>
            </div>

            <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-850 overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-mono border-b border-slate-200 dark:border-slate-850">
                    <th className="p-4">Title</th>
                    <th className="p-4">Authors</th>
                    <th className="p-4">Journal</th>
                    <th className="p-4">Year</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                  {publications.map(pub => (
                    <tr key={pub.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                      <td className="p-4 font-bold text-slate-900 dark:text-white leading-snug">{pub.title}</td>
                      <td className="p-4">{pub.authors.join(", ")}</td>
                      <td className="p-4 italic">{pub.journal}</td>
                      <td className="p-4 font-mono">{pub.year}</td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => setPubForm(pub)}
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-655"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePub(pub.id)}
                          className="p-1.5 rounded bg-slate-100 hover:bg-red-50 dark:bg-slate-950 dark:hover:bg-red-955/20 text-red-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Publication Modal */}
            {pubForm && (
              <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-850 p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-3">
                    <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                      {pubForm.id ? "Edit Research Details" : "Add Research Paper"}
                    </h2>
                    <button onClick={() => setPubForm(null)} className="text-slate-400 hover:text-slate-900">
                      Close
                    </button>
                  </div>

                  <form onSubmit={handleSavePub} className="space-y-4 text-left text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-350">Research Title</label>
                      <input
                        required
                        type="text"
                        value={pubForm.title || ""}
                        onChange={e => setPubForm({ ...pubForm, title: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-350">Authors (comma separated)</label>
                      <input
                        required
                        type="text"
                        value={Array.isArray(pubForm.authors) ? pubForm.authors.join(", ") : pubForm.authors || ""}
                        onChange={e => setPubForm({ ...pubForm, authors: e.target.value })}
                        placeholder="Sourabh Bhardwaj, Rahul Pandey"
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-350">Journal Name</label>
                      <input
                        required
                        type="text"
                        value={pubForm.journal || ""}
                        onChange={e => setPubForm({ ...pubForm, journal: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 dark:text-slate-350">Publication Year</label>
                        <input
                          required
                          type="number"
                          value={pubForm.year || ""}
                          onChange={e => setPubForm({ ...pubForm, year: Number(e.target.value) })}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 dark:text-slate-350">DOI Reference</label>
                        <input
                          type="text"
                          value={pubForm.doi || ""}
                          onChange={e => setPubForm({ ...pubForm, doi: e.target.value })}
                          placeholder="e.g. 10.1002/groundwater"
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-slate-800 dark:text-slate-100"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all text-xs"
                    >
                      Save Paper
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: MESSAGES INBOX */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Feedback Inbox</h1>

            <div className="space-y-4">
              {messages.length > 0 ? (
                messages.map(msg => (
                  <div key={msg.id} className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-850 flex gap-4 items-start text-left">
                    <div className="space-y-2 flex-grow text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm">{msg.name}</h3>
                          <p className="text-slate-500 font-mono mt-0.5">{msg.email} | {msg.phone || "No phone"}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-2 rounded bg-slate-50 hover:bg-red-50 hover:text-red-500 dark:bg-slate-950 dark:hover:bg-red-955/20 text-slate-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="border-t border-slate-100 dark:border-slate-850 pt-2 space-y-1">
                        <span className="font-bold text-slate-700 dark:text-slate-350">Subject: {msg.subject}</span>
                        <p className="text-slate-655 dark:text-slate-400 leading-relaxed italic">{msg.message}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block pt-1">
                        Received: {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center text-slate-550 italic">No feedback messages in the mailbox yet.</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
