const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    image: {
        type: String,
        required: true,
        trim: true,
        match: [/^https?:\/\/.+\.(png|jpg|jpeg|gif)$/, 'Please enter a valid image URL']
    },
    speciality: [{
        type: String,
        required: true,
        enum: ['Heart', 'Ear', 'Neurology', 'Orthopedics', 'Pediatrics', 'Nose']
    }],
    rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    description: { // New field
        type: String,
        trim: true,
        default: ''
    },
    images: [{ // New field for multiple images
        type: String,
        trim: true,
        match: [/^https?:\/\/.+\.(png|jpg|jpeg|gif)$/, 'Please enter a valid image URL'],
        default: []
    }],
    numberOfDoctors: { // New field
        type: Number,
        min: 0,
        default: 0
    },
    numberOfDepartment: { // New field
        type: Number,
        min: 0,
        default: 0
    }
}, { timestamps: true });

const HospitalModel = mongoose.model('hospitals', HospitalSchema);

module.exports = HospitalModel;