const HospitalModel = require('./../models/hospital.model');

const updateHospital = async (req, res) => {
    try {
        const { id } = req.params; // Get hospital ID from URL
        const { name, city, image, speciality, rating } = req.body; // Fields to update
        const userId = req.user.userId; // From JWT middleware

        // Find the hospital by ID
        const hospital = await HospitalModel.findById(id);
        if (!hospital) {
            const err = new Error('Hospital not found');
            err.statusCode = 404;
            throw err;
        }

        // Check if the user owns this hospital
        if (hospital.user.toString() !== userId) {
            const err = new Error('You are not authorized to update this hospital');
            err.statusCode = 403; // Forbidden
            throw err;
        }

        // Update only provided fields
        if (name) hospital.name = name;
        if (city) hospital.city = city;
        if (image) hospital.image = image;
        if (speciality) hospital.speciality = speciality;
        if (rating !== undefined) hospital.rating = rating;

        // Save updated hospital
        await hospital.save();

        res.status(200).json({
            success: true,
            message: 'Hospital updated successfully',
            hospital: {
                id: hospital._id,
                name: hospital.name,
                city: hospital.city,
                image: hospital.image,
                speciality: hospital.speciality,
                rating: hospital.rating,
                user: hospital.user
            }
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

module.exports = { updateHospital };