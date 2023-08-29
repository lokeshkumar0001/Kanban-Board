import React, {useState} from 'react';
import './styles/TaskCard.css';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import axios from 'axios';

const TaskCard = ({ task, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedTitle(task.title); // Reset to original title
    setEditedDescription(task.description); // Reset to original description
  };

  const handleEditSubmit = async () => {
    try {
      const updatedTask = {
        title: editedTitle,
        description: editedDescription,
        status: task.status,
      };

      await axios.put(`/api/v1/task/${task._id}`, updatedTask); // Replace with your backend API endpoint
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`api/v1/task/${task._id}`); 
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className={`task-card ${isEditing ? 'editing' : ''}`}>
      <h3 contentEditable={isEditing} onBlur={e => setEditedTitle(e.target.textContent)}>
        {editedTitle}
      </h3>
      <p contentEditable={isEditing} onBlur={e => setEditedDescription(e.target.textContent)}>
        {editedDescription}
      </p>
      <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEditClick}>
        Edit
      </Button>
      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
        Delete
      </Button>
      {isEditing && (
        <div className="edit-buttons">
          <Button variant="outlined" onClick={handleEditSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleEditCancel}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );

};

export default TaskCard;
