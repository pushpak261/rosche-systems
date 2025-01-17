import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box, Alert } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../InstanceApi/api';

const TaskItem = ({ task, onDelete, onToggleStatus }) => {
    const { token } = useContext(AuthContext);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [toggleMessage, setToggleMessage] = useState('');
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/tasks/${task._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDeleteMessage('Task deleted successfully!');
            setTimeout(() => {
                setDeleteMessage('');
                onDelete(task._id);
            }, 3000);
        } catch (error) {
            console.error('Failed to delete task:', error);
            setDeleteMessage('Failed to delete task. Please try again.');
        }
    };

    const handleToggleStatus = async () => {
        const newStatus = task.status === 'pending' ? 'completed' : 'pending';
        try {
            await axios.put(
                `${API_URL}/tasks/${task._id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setToggleMessage(`Task marked as ${newStatus}!`);
            setTimeout(() => {
                setToggleMessage('');
                onToggleStatus(task._id, newStatus);
            }, 3000);
        } catch (error) {
            console.error('Failed to update task status:', error);
            setToggleMessage('Failed to update task status. Please try again.');
        }
    };

    const handleEdit = () => {
        navigate(`/tasks/edit/${task._id}`);
    };

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {task.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Status: {task.status}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleToggleStatus}
                        sx={{ mr: 2 }}
                    >
                        Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleEdit}
                        sx={{ mr: 2 }}
                    >
                        Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Delete
                    </Button>
                </Box>
                {deleteMessage && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {deleteMessage}
                    </Alert>
                )}
                {toggleMessage && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {toggleMessage}
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
};

export default TaskItem;
