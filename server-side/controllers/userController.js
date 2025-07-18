const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
    try {
        const { companyName, companyDomain, companyID, companyAddress, founded_year, firstName, lastName, email, password, confirmPassword } = req.body;

        if (!companyName || !companyDomain || !companyID || !companyAddress ||
            !firstName || !lastName || !email || !password || !confirmPassword)
            return res.status(400).json({ message: 'Required fields missing' });

        if (password !== confirmPassword)
            return res.status(400).json({ message: 'Passwords do not match' });

        const existingEmail = await User.findOne({ email });
        if (existingEmail)
            return res.status(400).json({ message: 'Email already registered' });

        const existingCompany = await User.findOne({ companyName });
        if (existingCompany)
            return res.status(400).json({ message: 'Company already registered' });

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ companyName, companyDomain, companyID, companyAddress, founded_year, firstName, lastName, email, password: hashed });
        await newUser.save();

        await sendEmail(
            email,
            '🎉 Registration Successful - Welcome Aboard!',
            `Hello ${companyName},

            Thank you for registering on our platform.

            You are now registered as an "Owner". You can log in and start managing your team.

            Regards,
            TeamTrak`
        );

        res.status(201).json({ message: 'Registered as owner' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: 'Required fields missing' });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Wrong password' });

        let token = user.token;
        let isTokenValid = false;

        if (token) {
            try {
                jwt.verify(token, 'secret123');
                isTokenValid = true;
            } catch (err) {
                isTokenValid = false;
            }
        }

        if (!isTokenValid) {
            token = jwt.sign({ id: user._id }, 'secret123', { expiresIn: '7d' });
            user.token = token;
            await user.save();
        }

        res.json({ message: 'Login successful', token});
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.update = async (req, res) => {
    try {
        const { companyName, companyDomain, companyAddress,email } = req.body;

        const updated = await User.findByIdAndUpdate(
            req.user._id,
            { companyName, companyDomain, companyAddress, email },
            { new: true }
        ).select('-password');

        res.json({ message: 'Updated', user: updated });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
