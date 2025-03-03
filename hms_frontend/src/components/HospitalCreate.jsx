import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHospital } from '../api/api';

import './HospitalCreate.css';

const HospitalCreate = () => {
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        image: '',
        speciality: '',
        rating: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            speciality: formData.speciality.split(',').map(s => s.trim()),
            rating: parseFloat(formData.rating)
        };
        try {
            await createHospital(data);
            alert('Hospital created successfully!');
            setFormData({ name: '', city: '', image: '', speciality: '', rating: '' });
            navigate('/hospitals'); // Navigate to the hospitals list page
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create hospital');
        }
    };

    return (
        <div className="form-container">
            <h2>Create Hospital</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter hospital name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="text"
                        placeholder="Enter hospital image URL"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Specialities (comma-separated)</label>
                    <input
                        type="text"
                        placeholder="Enter specialities (e.g., Cardiology, Pediatrics)"
                        value={formData.speciality}
                        onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Rating (0-5)</label>
                    <input
                        type="number"
                        placeholder="Enter rating (0-5)"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        min="0"
                        max="5"
                        step="0.1"
                        required
                    />
                </div>
                <button type="submit">Create Hospital</button>
            </form>
        </div>
    );
};

export default HospitalCreate;
