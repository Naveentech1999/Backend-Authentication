const createUser = require("../models/Userschema")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")

const Register = async(req,res)=>{
    try{
        
        const { Username , Email , Password , ConfrimPassword} = req.body

        let exists = await createUser.findOne({Email})
        if(exists){
            return res.status(400).send("User already exits..")
        }
        else if (Password !== ConfrimPassword){
            return res.status(400).send("Password are not matching..")
        }
 
        const hasedPaswword = await bcrypt.hash(Password,12)

        let userdetails = new createUser({
            Username, 
            Email,
            Password : hasedPaswword,
            ConfrimPassword : hasedPaswword
            
        })

        
        
      
        await userdetails.save()
        res.status(200).json({message : "Registered Sucessfully.."})
        }catch(error){
        console.log(error)
        res.status(500).json({message:"Server error.."})
    }
}


const login = async(req,res)=>{
    try{
        const {  Email , Password } = req.body

        let exist = await createUser.findOne({Email})
        if(!exist){
            return res.status(400).send("User not found")
        }
        const isPasswordMatch = await bcrypt.compare(Password, exist.Password);

        if (!isPasswordMatch) {
            return res.status(400).send('Invalid credentials..');
        }
        let payload = {
            user :{
                id : exist.id
            }
        }
        jwt.sign(payload, "jwtSecret",{expiresIn:3600000},
          (err,token) =>{
              if (err) throw err;
              return res.json({token})
          }  
            )

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
}

const dashboard = async(req,res)=>{
    try{
        let exist = await createUser.findById(req.user.id)
        if(!exist){
            return res.status(400).json({message:"user not found!.."})
        }
        return res.json(exist)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Server Error..."})
    }
}

const updateUser = async(req,res)=>{
    try{
        const {Username , Email ,Password ,ConfrimPassword} = req.body
         const Users = await createUser.findByIdAndUpdate(req.params.id,{Username , Email , Password, ConfrimPassword})
         if(!Users){
            return res.ststus(404).send("user not found!..")
         }
          res.status(200).send("User Updated Successfully...")
        }
        catch(err){
            console.log(err)
            res.status(500).json({message:"Server Error..."})
        }
    }
    

    const usersAll = async (req,res)=>{
            try{
                const Users = await createUser.find();
                
                if(!Users || Users.length === 0){
                    
                    return res.status(404).json({message:"Users not Found!..."})
                   
                }
                res.status(200).json(Users)
                 
            }catch(err){
                console.log(err)
                res.status(500).json({message:"Server Error..."})
            }
    }

    const singleUser = async(req,res)=>{
    try{
        const User = await createUser.findById(req.params.id)
        if(!User){
            return res.send(404).send("User not found...")
        }
        res.status(200).json(User)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Server Error..."})
    }
}


const deleteUser = async(req,res)=>{
    try{
        const Users = await createUser.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"User deleted successfully..."})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Server Error..."})
    }
}

module.exports = { Register , login , dashboard , updateUser , singleUser , usersAll , deleteUser}
