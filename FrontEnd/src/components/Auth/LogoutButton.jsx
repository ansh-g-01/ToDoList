export default function LogoutButton({ onLogout }) {
  return (
    <button
      style={{
        marginTop: "10px",
        padding: "10px 18px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#d9534f",
        color: "#fff",
        fontSize: "15px",
        cursor: "pointer",
      }}
      onClick={onLogout}
    >
      🚪 Logout
    </button>
  );
}
