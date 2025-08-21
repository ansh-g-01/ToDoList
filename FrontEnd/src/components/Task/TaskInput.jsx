import { useState } from "react";
import { callSecure } from "../../api";

export default function TaskInput({ onTaskAdded }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !date) return alert("Please enter text and date");

    try {
      const newTask = await callSecure("/tasks", "POST", { text, date });
      setText("");
      setDate("");
      onTaskAdded(newTask); // notify parent to refresh list
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Task description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add Task</button>
    </form>
  );
}

const styles = {
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { padding: "8px", fontSize: "14px", flex: 1 },
  button: { padding: "8px 12px", cursor: "pointer" },
};
