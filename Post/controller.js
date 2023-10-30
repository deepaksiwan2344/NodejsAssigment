const newPost = require("./models")
const User = require(".././Auth/models")


exports.createNewpost = async(req, res)=>{
    try{
        const {title, content} = req.body
        const exist = await newPost.exsit({title: title})
        if(exist){
            return res.status(409).send("this title is already add")
        }
        const addpost = new newPost ({
            title: title,
            content: content,
            createdby: req.user.id
        });
        const savepost = await addpost.save()
        if(savepost){
            return res.status(201).json({
                status: 1,
                message: "User add post successfully",
                response:  savepost
            })
        }else{
            return res.status(400).json({
                status: 0,
                message: "somethings went wrong"

            })
        }

    }catch(err){
        return res.status(500).json({
            status: 0,
            message: "somethings went wrong"
        })

    }
}

exports.getAllCreatedPost = async(req, res) =>{
    try{
        const page= req.query.page || 1;
        const limit = req.limit || 10;
        const skip = (page - 1) * 10;
        const getallPost = await newPost
          .find()
          .skip(skip)
          .limit(limit)
          res.status(200).json({message: "successfull", response:getallPost })


    }catch(err){
        return res.status(500).json({
            status: 0,
            message: err.toString()
        })

    }
 
}

exports.getAllUserCreatedPost = async(req, res) =>{
    try{
        const user = await User.findById({_id: req.user.id})
        if(!user){
            return res.status(404).json({
                message: "No user Found"
            })
        }
        const GetnewPostById = await newPost.find({ createdby:user._id}).populate("createdby")
        if(GetnewPostById){
            return res.status(200).json({
                success: true,
                message: "get newPost successfuly"
            })
        }else{
            res.status(400).json({
                message: "this use not any newPost"
            })

        }

    }catch(err){
       return  res.status(500).json({
        status: 0,
        message: err.toString()
       })

    }
}
