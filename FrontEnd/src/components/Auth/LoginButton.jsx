export default function LoginButton({ onLogin }) {
  return (
    <button
      style={{
        padding: "12px 20px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#4285F4",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
      }}
      onClick={onLogin}
    >
      🔑 Login with Google
    </button>
  );
}
