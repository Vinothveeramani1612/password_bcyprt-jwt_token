const service = require('./service')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')

const savedata = async(req,res)=>
{    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(req.body.Password, salt)
    req.body.Password = hashedpassword 
    const details = await service.saveuser(req.body)
    res.send("Stored Successfully")
}
//login form 
const loginmatch = async(req,res)=>
{
    let email = req.body.Email
    const loginmail = await service.login(email)
    if(loginmail.length==0)
    {
        res.send({
            code:400,
            message :"Email not found"})  
}
else{
    const hashpassword = loginmail[0].Password
    const Passwordmatch = await bcrypt.compare(req.body.Password, hashpassword)
    const token = await Jwt.sign({email},process.env.Jwtsecretkey,{expiresIn:"30minutes"})
    if(Passwordmatch)
    {
        res.send(
            {
                code:200,
                message: "Login success",
                Token : token
            }
        )
    }
    else{
        res.send({
            code:400,
            message :"Incorrect password"
        })
    }
}}

module.exports=
{
    savedata,
    loginmatch
}