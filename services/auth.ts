const isClient = typeof window !== "undefined";

export interface User {
  email: string;
  role: "admin";
}

export async function login(email: string, password: string): Promise<User> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Default credentials for local development & demonstration
  if (email === "admin@sourabh.edu" && password === "admin123") {
    const user: User = { email, role: "admin" };
    if (isClient) {
      localStorage.setItem("sb_admin_user", JSON.stringify(user));
      localStorage.setItem("sb_auth_token", "mock_token_" + Date.now());
    }
    return user;
  }

  throw new Error("Invalid email or password. Please use admin@sourabh.edu / admin123");
}

export function logout(): void {
  if (isClient) {
    localStorage.removeItem("sb_admin_user");
    localStorage.removeItem("sb_auth_token");
  }
}

export function getCurrentUser(): User | null {
  if (!isClient) return null;
  try {
    const user = localStorage.getItem("sb_admin_user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  if (!isClient) return false;
  return localStorage.getItem("sb_auth_token") !== null;
}
