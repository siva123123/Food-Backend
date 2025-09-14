const Login= require('../model/login')
const bcrypt=require('bcryptjs')

exports.postregister=async(req,res)=>{
    const { username, email, password } = req.body;
    

    
    const saltRounds = 10; // Number of salt rounds
        try {
            
            const hash = await bcrypt.hash(password, saltRounds);
            const newUser = new Login({
                username,
                email,
                password: hash,
            });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
    }
};

exports.userlogin=async(req,res)=>{
    const {email,password}=req.params
    const User=await Login.findOne({email})
    if(User&&(await bcrypt.compare(password,User.password))){
        res.redirect('http://localhost:3000')
    }
    else{
        res.send('login failed')
    }
}