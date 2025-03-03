const HospitalModel = require('./../models/hospital.model');

const addHospitalDetails = async (req, res) => {
    try {
        const { id } = req.params; // Hospital ID from URL
        const { description, images, numberOfDoctors, numberOfDepartment } = req.body; // New details
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
            const err = new Error('You are not authorized to add details to this hospital');
            err.statusCode = 403; // Forbidden
            throw err;
        }

        // Update details if provided
        if (description !== undefined) hospital.description = description;
        if (images && Array.isArray(images)) {
            hospital.images = [...new Set([...hospital.images, ...images])]; // Append and deduplicate
        }
        if (numberOfDoctors !== undefined) hospital.numberOfDoctors = numberOfDoctors;
        if (numberOfDepartment !== undefined) hospital.numberOfDepartment = numberOfDepartment;

        // Save the updated hospital
        await hospital.save();

        res.status(200).json({
            success: true,
            message: 'Hospital details added/updated successfully',
            hospital: {
                id: hospital._id,
                name: hospital.name,
                city: hospital.city,
                image: hospital.image,
                speciality: hospital.speciality,
                rating: hospital.rating,
                user: hospital.user,
                description: hospital.description,
                images: hospital.images,
                numberOfDoctors: hospital.numberOfDoctors,
                numberOfDepartment: hospital.numberOfDepartment
            }
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

module.exports = { addHospitalDetails };