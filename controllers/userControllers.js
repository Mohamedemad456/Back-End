const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.getUsers = async(req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.signUp = async (req,res) => {
    try {
        const{email,userName,password} = req.body;
        let userExists = await User.findOne({ 
            $or: [{ email: email }, { userName: userName }] 
          });
        if(userExists){
            return res.status(400).json({message:"User already exists, Try Changing The User Name Or Email"})
        }

        if(password) var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must be 8-20 characters long, and include at least one uppercase letter, and include at least one lowercase letter, one number, and one special character.' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);

        userExists = new User({email, userName, password: hashedPassword});
        await userExists.save();
        return res.status(200).json(userExists);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


exports.login = async (req,res) =>{
    try {
        const{email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password1"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email or password2"})
        };

        // Create JWT 
        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '15m' });

        return res.status(200).json({message:"Login succesfully",token});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
