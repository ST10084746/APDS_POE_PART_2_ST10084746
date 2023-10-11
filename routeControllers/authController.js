const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.signup = async(req, res)=>{

    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user = new User({
            username: req.body.username,
            password: hash
        });
        user.save()
            .then(result =>{
                res.status(201).json({
                    message: 'User Created',
                    result: result
                })
         })
        .catch(err=>{
            res.status(500).json({
                err:err
            });
        });
        
    });

}

exports.login = async (req, res)=>{
    let currentUser;
    User.findOne({username: req.body.username})
    .then(user=>{
        if(!user)
        {
            return res.status(401).json({
                status: "Failure",
                message:"User Not Found"
            })
        }
        currentUser = user
        return bcrypt.compare(req.body.password, user.password)

    })
    .then(result=>{
        if(!result)
        {
            return res.status(401).json({
                status: "Aunthentication failutre",
                message: "Password incorrect"

            })
        }
        const token = jwt.sign({username:currentUser.username, userid: currentUser._id},
            'secret_this_should_be_longer_than_it_is',
            {expiresIn: '1h'});

        res.status(200).json({
            status: "success",
            message: "Logged in",
            token:token

        });
    })
    .catch(err=>{
        return res.status(401).json({
            message:"Authentication failure"
        });

    })

}
/*const {username, password} = req.body
    try{
        const user = User.findOne({username})
        if(!user){
            return res.status(404).json({
                status: 'failed',
                message: "User Not Found"
            })
        }

        

        if(isCorrect){
            res.status(201).json({
                status: "success"
            })
        }else{
            res.status(400).json({
                status: "failed",
                message: "incorrect username or password"
            })
        }

    }*/