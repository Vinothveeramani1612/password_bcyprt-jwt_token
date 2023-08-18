const express= require('express')
const router = express.Router()
const functions = require('./controller/index')
let routes = (app)=>
{
    router.post('/save', functions.savedata)
    router.post('/login', functions.loginmatch)
    app.use('/api',router)
}
module.exports= routes