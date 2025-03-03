const HospitalModel = require('./../models/hospital.model');
const UserModel = require('./../models/users.model');

const deleteHospital = async (req, res) => {
    try {
        const { id } = req.params; // Get hospital ID from URL
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
            const err = new Error('You are not authorized to delete this hospital');
            err.statusCode = 403; // Forbidden
            throw err;
        }

        // Delete the hospital
        await HospitalModel.findByIdAndDelete(id);

        // Optionally update user's hospitals array (if using bidirectional reference)
        const user = await UserModel.findById(userId);
        if (user && user.hospitals) {
            user.hospitals = user.hospitals.filter(hospitalId => hospitalId.toString() !== id);
            await user.save();
        }

        res.status(200).json({
            success: true,
            message: 'Hospital deleted successfully',
            deletedHospitalId: id
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

module.exports = { deleteHospital };