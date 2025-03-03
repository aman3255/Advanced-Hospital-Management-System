const HospitalModel = require('./../models/hospital.model'); 
const UserModel = require('./../models/users.model');        

const createHospital = async (req, res) => {
    try {
        const { name, city, image, speciality, rating } = req.body;
        const userId = req.user.userId;

        if (!name || !city || !image || !speciality || !rating) {
            const err = new Error('All fields (name, city, image, speciality, rating) are required');
            err.statusCode = 400;
            throw err;
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            const err = new Error('User does not exist');
            err.statusCode = 404;
            throw err;
        }

        const newHospital = new HospitalModel({
            name,
            city,
            image,
            speciality,
            rating,
            user: userId
        });
        await newHospital.save();

        // Optional: Update user's hospitals array
        if (user.hospitals) {
            user.hospitals = Array.isArray(user.hospitals) ? [...user.hospitals, newHospital._id] : [newHospital._id];
            await user.save();
        }

        res.status(201).json({
            success: true,
            message: 'Hospital created successfully',
            hospital: {
                id: newHospital._id,
                name: newHospital.name,
                city: newHospital.city,
                image: newHospital.image,
                speciality: newHospital.speciality,
                rating: newHospital.rating,
                user: newHospital.user
            }
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

const listAllTheHospital = async (req, res) => {
    try {
        const hospitals = await HospitalModel.find();
        if (!hospitals || hospitals.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No hospitals found',
                hospitals: []
            });
        }

        const hospitalData = hospitals.map(hospital => ({
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
        }));

        res.status(200).json({
            success: true,
            message: 'Hospitals retrieved successfully',
            hospitals: hospitalData
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

const singleHospital = async (req, res) => {
    try {
        const { id } = req.params;

        const hospital = await HospitalModel.findById(id);
        if (!hospital) {
            const err = new Error('Hospital not found');
            err.statusCode = 404;
            throw err;
        }

        const hospitalData = {
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
        };

        res.status(200).json({
            success: true,
            message: 'Hospital retrieved successfully',
            hospital: hospitalData
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};


module.exports = { createHospital, listAllTheHospital, singleHospital };