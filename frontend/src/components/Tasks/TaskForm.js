import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Link } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { API_URL } from '../../InstanceApi/api';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${API_URL}/tasks`,
                { title, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/tasks');
        } catch (error) {
            console.error('Failed to create task:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Add New Task
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                        Add Task
                    </Button>
                </form>
                <Box sx={{ mt: 2 }}>
                    <Link component={RouterLink} to="/tasks">
                        Back to Task List
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default TaskForm;
