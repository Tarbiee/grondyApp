// import express from 'express'
const express = require('express')
const app = express();//using app for express, i have put this here for easy access
// import { connect, connection } from 'mongoose'
const {connect, connection} = require('mongoose'); //i hope u know the curly braces rep destructuring👍 u will be using destructuring alot at other times
const PORT = 3001;
// import morgan from 'morgan'
const morgan = require('morgan');
// import { urlencoded, json } from 'body-parser'
const {urlencoded, json} = require('body-parser');


const EmployeeRoute = require('./routes/employee');
const AuthRoute = require('./routes/auth')
try {
    //'mongodb://localhost:27017/testdb' i suggest u use atlas, either way you will be doing the same thing in an easy way even i havent use the local 27017, it was failing, u can get back to it later
    connect('mongodb+srv://johnwawandera:wanderaelite38@cluster1.hxwsk.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        // useFindAndModify: false, use this to create an error and see if your error handlers are working
        useUnifiedTopology: true
    }).then(()=>{
        app.get('/', (req, res)=>{
            res.send('hello world');
        })
    })

//ensuring a connection is established to database, if it fails, throws a database error, notice db.once and not db.on, i tested it and db.on was not throwing an error, maybe its deprecated
const db = connection
db.once('error',(err) => {
    console.error(`connection fail => ${err}`)
})
db.once('open',() => {
    console.log('Database Connection Established!')
})

//nothin changed to your routes
app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(json())
app.use('/uploads', express.static('uploads'))

// const PORT = process.env.PORT || 5001 u can still use this
app.use('api/employee', EmployeeRoute) //looks like you were trying to access an end point that u have just imported to this file, e.g localhost:3001/api/user
app.use('/api', AuthRoute)

} catch (error) {
    console.error(`error occured here ${error}`); //still will catch any error that might occure in the course of code execution
}

/*
N/B the code is wrapped inside try, then comes the catch error that throws an
 error for anything during code execution, even if u mispell or trying to access something that doesn't exist or undefined

 */


app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)}) //last line of code, check the backticks

