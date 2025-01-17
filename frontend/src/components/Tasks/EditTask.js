import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from '../../InstanceApi/api';

const EditTask = () => {
    const { taskId } = useParams();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${API_URL}/tasks/${taskId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTitle(response.data.title);
                setDescription(response.data.description);
            } catch (error) {
                console.error('Failed to fetch task:', error);
            }
        };
        fetchTask();
    }, [taskId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${API_URL}/tasks/${taskId}`,
                { title, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/tasks');
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Edit Task
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
                        Update Task
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default EditTask;
