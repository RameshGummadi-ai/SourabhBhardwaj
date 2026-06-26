import {
  Publication,
  Experience,
  Education,
  Project,
  Blog,
  Certification,
  Lecture,
  ContactMessage,
  Comment,
  initialPublications,
  initialExperiences,
  initialEducation,
  initialCertifications,
  initialLectures,
  initialProjects,
  initialBlogs
} from "./dataSeed";

// Local Storage Helper functions to run on client side safely
const isClient = typeof window !== "undefined";

function getLocalData<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Local storage read error", error);
    return defaultValue;
  }
}

function setLocalData<T>(key: string, value: T): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Local storage write error", error);
  }
}

// Check if Firebase configs are provided (can be set up in Vercel environment variables)
const hasFirebase = 
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

// Mock database latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getPublications(): Promise<Publication[]> {
  await delay(50);
  return getLocalData<Publication[]>("sb_publications", initialPublications);
}

export async function savePublication(pub: Publication): Promise<void> {
  const list = await getPublications();
  const index = list.findIndex(p => p.id === pub.id);
  if (index >= 0) {
    list[index] = pub;
  } else {
    list.push(pub);
  }
  setLocalData("sb_publications", list);
}

export async function deletePublication(id: string): Promise<void> {
  const list = await getPublications();
  const filtered = list.filter(p => p.id !== id);
  setLocalData("sb_publications", filtered);
}

export async function getExperiences(): Promise<Experience[]> {
  return getLocalData<Experience[]>("sb_experiences", initialExperiences);
}

export async function saveExperience(exp: Experience): Promise<void> {
  const list = await getExperiences();
  const index = list.findIndex(e => e.id === exp.id);
  if (index >= 0) {
    list[index] = exp;
  } else {
    list.push(exp);
  }
  setLocalData("sb_experiences", list);
}

export async function deleteExperience(id: string): Promise<void> {
  const list = await getExperiences();
  setLocalData("sb_experiences", list.filter(e => e.id !== id));
}

export async function getEducation(): Promise<Education[]> {
  return getLocalData<Education[]>("sb_education", initialEducation);
}

export async function saveEducation(edu: Education): Promise<void> {
  const list = await getEducation();
  const index = list.findIndex(e => e.id === edu.id);
  if (index >= 0) {
    list[index] = edu;
  } else {
    list.push(edu);
  }
  setLocalData("sb_education", list);
}

export async function deleteEducation(id: string): Promise<void> {
  const list = await getEducation();
  setLocalData("sb_education", list.filter(e => e.id !== id));
}

export async function getProjects(): Promise<Project[]> {
  return getLocalData<Project[]>("sb_projects", initialProjects);
}

export async function saveProject(project: Project): Promise<void> {
  const list = await getProjects();
  const index = list.findIndex(p => p.id === project.id);
  if (index >= 0) {
    list[index] = project;
  } else {
    list.push(project);
  }
  setLocalData("sb_projects", list);
}

export async function deleteProject(id: string): Promise<void> {
  const list = await getProjects();
  setLocalData("sb_projects", list.filter(p => p.id !== id));
}

export async function getBlogs(): Promise<Blog[]> {
  return getLocalData<Blog[]>("sb_blogs", initialBlogs);
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const list = await getBlogs();
  const blog = list.find(b => b.slug === slug);
  if (blog && isClient) {
    // Increment local views count automatically
    blog.views += 1;
    await saveBlog(blog);
  }
  return blog;
}

export async function saveBlog(blog: Blog): Promise<void> {
  const list = await getBlogs();
  const index = list.findIndex(b => b.id === blog.id);
  if (index >= 0) {
    list[index] = blog;
  } else {
    list.push(blog);
  }
  setLocalData("sb_blogs", list);
}

export async function deleteBlog(id: string): Promise<void> {
  const list = await getBlogs();
  setLocalData("sb_blogs", list.filter(b => b.id !== id));
}

export async function likeBlog(slug: string): Promise<number> {
  const list = await getBlogs();
  const index = list.findIndex(b => b.slug === slug);
  if (index >= 0) {
    list[index].likes += 1;
    setLocalData("sb_blogs", list);
    return list[index].likes;
  }
  return 0;
}

export async function addComment(slug: string, comment: Omit<Comment, "id" | "createdAt">): Promise<Comment> {
  const list = await getBlogs();
  const index = list.findIndex(b => b.slug === slug);
  const newComment: Comment = {
    id: "comment_" + Math.random().toString(36).substr(2, 9),
    authorName: comment.authorName,
    authorEmail: comment.authorEmail,
    content: comment.content,
    createdAt: new Date().toISOString()
  };
  
  if (index >= 0) {
    if (!list[index].comments) list[index].comments = [];
    list[index].comments!.push(newComment);
    setLocalData("sb_blogs", list);
  }
  return newComment;
}

export async function getCertifications(): Promise<Certification[]> {
  return getLocalData<Certification[]>("sb_certifications", initialCertifications);
}

export async function saveCertification(cert: Certification): Promise<void> {
  const list = await getCertifications();
  const index = list.findIndex(c => c.id === cert.id);
  if (index >= 0) {
    list[index] = cert;
  } else {
    list.push(cert);
  }
  setLocalData("sb_certifications", list);
}

export async function deleteCertification(id: string): Promise<void> {
  const list = await getCertifications();
  setLocalData("sb_certifications", list.filter(c => c.id !== id));
}

export async function getLectures(): Promise<Lecture[]> {
  return getLocalData<Lecture[]>("sb_lectures", initialLectures);
}

export async function saveLecture(lecture: Lecture): Promise<void> {
  const list = await getLectures();
  const index = list.findIndex(l => l.id === lecture.id);
  if (index >= 0) {
    list[index] = lecture;
  } else {
    list.push(lecture);
  }
  setLocalData("sb_lectures", list);
}

export async function deleteLecture(id: string): Promise<void> {
  const list = await getLectures();
  setLocalData("sb_lectures", list.filter(l => l.id !== id));
}

export async function getMessages(): Promise<ContactMessage[]> {
  return getLocalData<ContactMessage[]>("sb_messages", []);
}

export async function saveMessage(msg: Omit<ContactMessage, "id" | "createdAt">): Promise<void> {
  const list = await getMessages();
  const newMessage: ContactMessage = {
    id: "msg_" + Math.random().toString(36).substr(2, 9),
    ...msg,
    createdAt: new Date().toISOString()
  };
  list.push(newMessage);
  setLocalData("sb_messages", list);
}

export async function deleteMessage(id: string): Promise<void> {
  const list = await getMessages();
  setLocalData("sb_messages", list.filter(m => m.id !== id));
}

// Analytics functions
export async function getVisitorStats(): Promise<{ visitors: number; totalBlogViews: number; totalMessages: number }> {
  const visitors = getLocalData<number>("sb_visitor_count", 1438);
  const blogs = await getBlogs();
  const messages = await getMessages();
  
  const totalBlogViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);
  
  return {
    visitors,
    totalBlogViews,
    totalMessages: messages.length
  };
}

export async function incrementVisitorStats(): Promise<void> {
  if (!isClient) return;
  // Use session storage so we don't spam increments on page reload by same visitor session
  if (sessionStorage.getItem("sb_visit_recorded")) return;
  
  const visitors = getLocalData<number>("sb_visitor_count", 1438);
  setLocalData("sb_visitor_count", visitors + 1);
  sessionStorage.setItem("sb_visit_recorded", "true");
}
