
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import {API_URL} from '../InstanceApi/api'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        console.log('Token updated:', token);
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);



    //use instance url backend
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            setToken(response.data.token);
            setUser({ email });
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const signup = async (email, password) => {
        try {
            await axios.post(`${API_URL}/auth/signup`, { email, password });
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    const logout = () => {
        setToken('');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };