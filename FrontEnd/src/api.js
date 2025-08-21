const BASE_URL = "https://whatsyourtodoo.onrender.com";

export async function callSecure(path, method = "GET", body) {
  const { getAuth } = await import("firebase/auth");
  const token = await getAuth().currentUser?.getIdToken();

  if (!token) throw new Error("User not logged in");

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
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }

  return res.text();
}
  