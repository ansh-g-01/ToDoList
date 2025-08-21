import { getAuth } from "firebase/auth";

const BASE_URL = "https://whatsyourtodoo.onrender.com";

export async function callSecure(path, method = "GET", body) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not logged in");

  // ✅ Always get a fresh token
  const token = await user.getIdToken(/* forceRefresh = false */);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) throw new Error(`API ${method} ${path} failed: ${res.status}`);

  if (res.status === 204) return null;

  const contentType = res.headers.get("content-type");
  return contentType?.includes("application/json") ? res.json() : res.text();
}
