const mongoose     = require('mongoose')
const Schema       = mongoose.Schema

const employeeSchema   = new Schema({
    firstname:{
        type:String
    },
    secondname:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    dateOfBirth:{
        type:Date
    },
    gender:{
        type:String
    },
    avatar: {
        type:String
    }
},{timestamps: true})

const User = mongoose.model('Employee', employeeSchema)
module.exports = Employee