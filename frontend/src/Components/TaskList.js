import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./styles/TaskList.css";
import TaskCard from "./TaskCard";

const TaskList = ({ title, tasks }) => {
  return (
    <Droppable droppableId={title} >
      {(provided) => (
        <div
          className="task-list"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>{title}</h2>
          {tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <TaskCard task={task} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
