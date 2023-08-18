const mongoose = require('mongoose')
const userschema = new mongoose.Schema(
    {
        Email : String,
        Password : String
    }
)

const collect = new mongoose.model('user', userschema)
const saveuser = async(data)=>
{
    const details = new collect(data)
    const userdetails = await details.save()
    return userdetails 
}
//login function 
const login = async(data)=>
{
    const mailmatch = await collect.aggregate ([{$match:{Email:data}}])
    return mailmatch
}

module.exports=
{
    saveuser, login
}