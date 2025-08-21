// api.js - handles secure requests to FastAPI backend using Firebase token
export async function callSecure(path, method = "GET", body) {
  // Dynamically import Firebase auth
  const { getAuth } = await import("firebase/auth");
  const token = await getAuth().currentUser?.getIdToken();

  if (!token) throw new Error("User not logged in");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(`http://127.0.0.1:5000${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) throw new Error(`API ${method} ${path} failed: ${res.status}`);

  // ✅ Handle no content (204) safely
  if (res.status === 204) return null;

  // ✅ Check if response has JSON
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }

  // Otherwise return text
  return res.text();
}
