const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    hospitals: [{ // Changed from singular 'hospital' to plural 'hospitals'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospitals',
        default: []
    }]
}, {
    timestamps: true
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;