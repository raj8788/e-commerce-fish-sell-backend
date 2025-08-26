import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    const { name , email, phone, password, role } = req.body;

    if (!password || !role || (!email && !phone && !name)) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({name , email, phone, password:hashedPassword, role });
        return res.status(201).json({ message: 'User registered successfully', userId: newUser.user_id });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ message: 'Invalid user' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const token = jwt.sign({ id: user.user_id, role:user.role },  process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.log(error);
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'invalid credentials'});
    }
};