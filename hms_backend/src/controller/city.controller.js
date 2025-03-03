const HospitalModel = require('./../models/hospital.model');

const findAllHospitalByCity = async (req, res) => {
    try {
        const { city } = req.params; // Get city from URL parameter

        // Validate city parameter
        if (!city) {
            const err = new Error('City parameter is required');
            err.statusCode = 400;
            throw err;
        }

        // Find all hospitals in the specified city
        const hospitals = await HospitalModel.find({ city: city });

        // If no hospitals found, return empty array with success
        if (!hospitals || hospitals.length === 0) {
            return res.status(200).json({
                success: true,
                message: `No hospitals found in ${city}`,
                hospitals: []
            });
        }

        // Map the results to the desired response format
        const hospitalData = hospitals.map(hospital => ({
            id: hospital._id,
            name: hospital.name,
            city: hospital.city,
            image: hospital.image,
            speciality: hospital.speciality,
            rating: hospital.rating,
            user: hospital.user
        }));

        res.status(200).json({
            success: true,
            message: `Hospitals found in ${city}`,
            hospitals: hospitalData
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

module.exports = { findAllHospitalByCity };