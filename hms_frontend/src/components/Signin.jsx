import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../api/api';

import '../components/Signin.css'; // Ensure correct path to CSS file

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signin(email, password);
            localStorage.setItem('token', response.data.jwt);
            navigate('/hospitals/create');
        } catch (err) {
            setError(err.response?.data?.message || 'Signin failed');
        }
    };

    return (
        <div className="form-container">
            <h2>Signin</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // ✅ Fixed syntax issue here
                        required
                    />
                </div>
                <button type="submit">Signin</button>
            </form>
        </div>
    );
};

export default Signin;
