const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel')

const secretKey = 'your-secret-key';


const Register = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const users = await User.find()
        if (users.some(user => user.email === email)) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("auth token", hashedPassword)

        const newUser = new User({ name, email: email, password: hashedPassword });
        const savedUser = await newUser.save();
        console.log(res)
        return res.status(201).json({ savedUser, message: 'User registered successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({error:error.errors, message: error._message });
    }

};


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user
        const users = await User.find()
        const user = users.find(u => u.email === email);
        console.log("loged data", user)
        // check the user
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("password", passwordMatch)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
        console.log(res)
        return res.status(200).json({ token, message: 'User login successfully' });

    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    Register,
    Login
}