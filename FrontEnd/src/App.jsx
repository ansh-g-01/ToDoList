import { useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import TaskList from "./components/Task/TaskList";
import LoginButton from "./components/Auth/LoginButton";
import LogoutButton from "./components/Auth/LogoutButton";

function App() {
  const [user, setUser] = useState(null);

  // 🔹 Login Handler
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      // Fetch Firebase ID token
      const token = await result.user.getIdToken();
      console.log("✅ Firebase Token:", token);
    } catch (error) {
      console.error("❌ Login Failed:", error.message);
    }
  };

  // 🔹 Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("❌ Logout Failed:", error.message);
    }
  };

  return (
    <div style={styles.container}>
      {!user ? (
        <LoginButton onLogin={handleLogin} />
      ) : (
        <div style={styles.card}>
          <h2>Welcome, {user.displayName} 👋</h2>
          <p>Email: {user.email}</p>
          <LogoutButton onLogout={handleLogout} />
          <hr style={{ margin: "20px 0" }} />
          <TaskList />
        </div>
      )}
    </div>
  );
}

// 🎨 Inline styles (can be replaced with Tailwind/Material-UI later)
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "400px",
  },
};

export default App;
