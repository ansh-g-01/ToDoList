import { useEffect, useState } from "react";
import { callSecure } from "../../api";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await callSecure("/tasks");
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [...prev, newTask].sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const handleTaskDeleted = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <TaskInput onTaskAdded={handleTaskAdded} />
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={handleTaskUpdated}
            onDelete={handleTaskDeleted}
          />
        ))
      )}
    </div>
  );
}

// Import TaskInput from same folder
import TaskInput from "./TaskInput";
