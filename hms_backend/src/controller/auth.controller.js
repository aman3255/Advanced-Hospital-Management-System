require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'DEV';
const JWT_SECRET_KEY = process.env[`${NODE_ENV}_JWT_SECRET_KEY`];
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('./../models/users.model');

// In-memory cache for JWTs
const tokenCache = new Map();

const generateToken = (userId, email) => {
    const token = jwt.sign(
        { userId, email },
        JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );
    return token;
};

const SignupController = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName) {
            const err = new Error("Full name is required");
            err.statusCode = 400;
            throw err;
        }

        if (!email) {
            const err = new Error("Email is required");
            err.statusCode = 400;
            throw err;
        }

        if (!password) {
            const err = new Error("Password is required");
            err.statusCode = 400;
            throw err;
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            const err = new Error("User already exists");
            err.statusCode = 409;
            throw err;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            fullName,
            email,
            password: hashedPassword
        });
        await newUser.save();

        if (!JWT_SECRET_KEY) {
            throw new Error('JWT_SECRET_KEY is not configured');
        }

        const token = generateToken(newUser._id, newUser.email);
        tokenCache.set(newUser.email, { token, expiresAt: Date.now() + 3600000 }); // Cache for 1 hour (3600s * 1000ms)

        res.status(201).json({
            success: true,
            message: "User created successfully !!!",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email
            },
            jwt: token
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

const SigninController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            const err = new Error('Email is required');
            err.statusCode = 400;
            throw err;
        }

        if (!password) {
            const err = new Error('Password is required');
            err.statusCode = 400;
            throw err;
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            const err = new Error('User does not exist !!!');
            err.statusCode = 404;
            throw err;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const err = new Error('Invalid credentials');
            err.statusCode = 401;
            throw err;
        }

        if (!JWT_SECRET_KEY) {
            throw new Error('JWT_SECRET_KEY is not configured');
        }

        // Check cache for existing token
        const cachedToken = tokenCache.get(email);
        let token;
        if (cachedToken && cachedToken.expiresAt > Date.now()) {
            token = cachedToken.token; // Reuse cached token if not expired
        } else {
            token = generateToken(user._id, user.email);
            tokenCache.set(email, { token, expiresAt: Date.now() + 3600000 }); // Update cache
        }

        res.status(200).json({
            success: true,
            message: "Signin successful",
            jwt: token
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

module.exports = {
    SignupController,
    SigninController
};