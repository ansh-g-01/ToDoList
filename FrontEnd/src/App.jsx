import { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import TaskList from "./components/Task/TaskList";
import LoginButton from "./components/Auth/LoginButton";
import LogoutButton from "./components/Auth/LogoutButton";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const token = await currentUser.getIdToken();
        console.log("✅ Firebase Token:", token);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      const token = await result.user.getIdToken();
      console.log("✅ Firebase Token:", token);
    } catch (error) {
      console.error("❌ Login Failed:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("❌ Logout Failed:", error.message);
    }
  };

  const updateStats = (newStats) => {
    setStats(newStats);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p className="loading-text">Initializing your workspace...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {!user ? (
        <div className="auth-section">
          <div className="hero-content">
            <h1 className="hero-title">TaskMaster Pro</h1>
            <p className="hero-subtitle">
              Streamline your productivity with our advanced task management platform
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📋</div>
                <h3>Smart Organization</h3>
                <p>Organize tasks with intelligent categorization and priority levels</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Progress Tracking</h3>
                <p>Monitor your productivity with detailed analytics and insights</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔔</div>
                <h3>Smart Reminders</h3>
                <p>Never miss a deadline with intelligent notification system</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Goal Setting</h3>
                <p>Set and achieve your goals with structured milestone tracking</p>
              </div>
            </div>
            <LoginButton onLogin={handleLogin} className="login-btn" />
          </div>
        </div>
      ) : (
        <div className="dashboard">
          {/* Header Section */}
          <header className="dashboard-header">
            <div className="user-info">
              <img 
                src={user.photoURL || '/default-avatar.png'} 
                alt="Profile" 
                className="user-avatar"
              />
              <div className="user-details">
                <h2 className="user-name">Welcome back, {user.displayName}</h2>
                <p className="user-email">{user.email}</p>
                <p className="last-login">Last login: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="header-actions">
              <LogoutButton onLogout={handleLogout} className="logout-btn" />
            </div>
          </header>

          {/* Stats Overview */}
          <section className="stats-overview">
            <h3 className="section-title">Productivity Overview</h3>
            <div className="stats-grid">
              <div className="stat-card total">
                <div className="stat-icon">📝</div>
                <div className="stat-content">
                  <span className="stat-number">{stats.totalTasks}</span>
                  <span className="stat-label">Total Tasks</span>
                </div>
              </div>
              <div className="stat-card completed">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <span className="stat-number">{stats.completedTasks}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              <div className="stat-card pending">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <span className="stat-number">{stats.pendingTasks}</span>
                  <span className="stat-label">Pending</span>
                </div>
              </div>
              <div className="stat-card progress">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <span className="stat-number">
                    {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%
                  </span>
                  <span className="stat-label">Completion Rate</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="quick-actions">
            <h3 className="section-title">Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn primary">
                <span className="btn-icon">➕</span>
                Add New Task
              </button>
              <button className="action-btn secondary">
                <span className="btn-icon">📋</span>
                View All Tasks
              </button>
              <button className="action-btn secondary">
                <span className="btn-icon">📊</span>
                Analytics
              </button>
              <button className="action-btn secondary">
                <span className="btn-icon">⚙️</span>
                Settings
              </button>
            </div>
          </section>

          {/* Main Task Section */}
          <main className="main-content">
            <TaskList onStatsUpdate={updateStats} />
          </main>

          {/* Tips Section */}
          <aside className="productivity-tips">
            <h3 className="section-title">Productivity Tips</h3>
            <div className="tips-container">
              <div className="tip-card">
                <strong>🎯 Focus on Priority</strong>
                <p>Start your day by tackling high-priority tasks when your energy is at its peak.</p>
              </div>
              <div className="tip-card">
                <strong>⏰ Time Blocking</strong>
                <p>Allocate specific time blocks for different types of tasks to maintain focus.</p>
              </div>
              <div className="tip-card">
                <strong>📝 Regular Reviews</strong>
                <p>Weekly reviews help you stay on track and adjust your goals as needed.</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;