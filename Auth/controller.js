const User = require("./models")
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");


exports.UserSignup = async(req, res, next)=>{
    let {user_name, email, password} = req.body
    try{
        const exist = await User.exists({email: req.body.email})
        if(exist){
            return res.json({message: "User Already exist"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new User({
            user_name,
            email,
            password: hashedPassword
        })
        const saveuser = await newuser.save();
        return res.send({message: "success",saveuser })

    }catch(err){
        res.json({message: "something went wrong"})
        
    }
}

exports.userlogin = async(req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(402).json({message: "this email wrong"})
        }
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match){
            return res.status(422).json({message: "wrong credentail"  })


        }else{
            const token = jwt.sign(
                {
                    id: user._id,

                },
                process.env.JWT_SECRET,
                {expireIn: "30d"}

            );
            res.status(201).json({message: "successfull", token: token})
        }

    }catch(err){
       res.status(500).json({message: "wrong credential"})
    }


}

exports.createNewpost = async(req, res)=>{

    
}