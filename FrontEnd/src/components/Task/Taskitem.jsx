import { callSecure } from "../../api";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const toggleComplete = async () => {
    try {
      const updated = await callSecure(`/tasks/${task.id}`, "PUT", {
        completed: !task.completed,
      });
      onUpdate(updated);
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task");
    }
  };

  const deleteTask = async () => {
    if (!confirm("Delete this task?")) return;
    try {
      await callSecure(`/tasks/${task.id}`, "DELETE");
      onDelete(task.id);
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
      />
      <span style={{ ...styles.text, textDecoration: task.completed ? "line-through" : "none" }}>
        {task.text} ({task.date})
      </span>
      <button onClick={deleteTask} style={styles.deleteBtn}>🗑️</button>
    </div>
  );
}

const styles = {
  container: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" },
  text: { flex: 1 },
  deleteBtn: { cursor: "pointer", background: "none", border: "none", color: "red" },
};
