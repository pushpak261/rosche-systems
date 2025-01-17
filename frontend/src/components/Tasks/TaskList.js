import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Typography, Select, MenuItem, Box, CircularProgress, Alert } from '@mui/material';
import TaskItem from './TaskItem';
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from '../../InstanceApi/api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${API_URL}/tasks`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(response.data);
            } catch (error) {
                setError('Failed to fetch tasks. Please try again later.');
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [token]);

    const handleDelete = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    const handleToggleStatus = (taskId, newStatus) => {
        setTasks(tasks.map(task =>
            task._id === taskId ? { ...task, status: newStatus } : task
        ));
    };

    const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Task List
                </Typography>
                <Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    fullWidth
                    sx={{ mb: 3 }}
                    variant="outlined"
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                </Select>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onDelete={handleDelete}
                            onToggleStatus={handleToggleStatus}
                        />
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary" align="center">
                        No tasks to display.
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default TaskList;
