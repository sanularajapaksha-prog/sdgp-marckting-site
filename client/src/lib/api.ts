// Backend API base URL
// In production the frontend (GitHub Pages) calls the Railway backend.
// Set VITE_API_URL in your .env file or Railway environment variables.
export const API_BASE =
  (import.meta as any).env?.VITE_API_URL ||
  "https://sdgp-marckting-site-production.up.railway.app";

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }

  return data as T;
}

export const api = {
  // Waitlist
  joinWaitlist: (payload: { email: string; name?: string; referralSource?: string }) =>
    request<{ success: boolean; message: string; position: number }>(
      "POST",
      "/api/waitlist",
      payload
    ),

  // Newsletter
  subscribeNewsletter: (payload: { email: string }) =>
    request<{ success: boolean; message: string }>(
      "POST",
      "/api/newsletter",
      payload
    ),

  // Contact
  sendContact: (payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) =>
    request<{ success: boolean; message: string; id: string }>(
      "POST",
      "/api/contact",
      payload
    ),

  // Reviews
  getReviews: () =>
    request<{ reviews: unknown[] }>("GET", "/api/reviews"),

  submitReview: (payload: {
    name: string;
    country: string;
    rating: number;
    review: string;
  }) =>
    request<{ success: boolean; message: string; id: string }>(
      "POST",
      "/api/reviews",
      payload
    ),

  // Stats
  getStats: () =>
    request<{
      waitlistCount: number;
      downloads: number;
      countries: number;
      destinations: number;
      rating: number;
    }>("GET", "/api/stats"),
};
