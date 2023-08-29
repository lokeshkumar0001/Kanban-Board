import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import "./styles/KanbanBoard.css";
import TaskList from "./TaskList";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do", // Default status
  });

  useEffect(() => {
    axios
      .get("/api/v1/allTask")
      .then((response) => {
        setTasks(response.data.task);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleAddTask = async (e) => {
    try {
      await axios.post("/api/v1/createTask", newTask);
      setNewTask({
        title: "",
        description: "",
        status: "To Do",
      });
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  const handleDragEnd = async (result) => {
    // console.log("hi");
    if (!result.destination) return; // Item was not dropped in a valid location

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    // Update the task status based on the destination droppable
    const statusMap = {
      "To Do": "To Do",
      "Doing": "Doing",
      "Done": "Done",
    };

    const newStatus = statusMap[result.destination.droppableId];
    movedTask.status = newStatus;

    setTasks(updatedTasks);
    try {
      console.log(movedTask._id);
      await axios.put(`/api/v1/task/${movedTask._id}`, movedTask); // Update task status
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        <div className="new-task-section">
          <h2>Add New Task</h2>
          <form className="new-task-form" onSubmit={handleAddTask}>
            <label>Title:</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
            />
            <label>Description:</label>
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              required
            />
            <label>Status:</label>
            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <option value="To Do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
            <button type="submit">Add Task</button>
          </form>
        </div>

        <div className="kanban-board">
          <TaskList
            title="To Do"
            tasks={tasks.filter((task) => task.status === "To Do")}
          />
          <TaskList
            title="Doing"
            tasks={tasks.filter((task) => task.status === "Doing")}
          />
          <TaskList
            title="Done"
            tasks={tasks.filter((task) => task.status === "Done")}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
