const User   = require('../models/Employee')

// Show the list of Employees
const index = (req, res, next)=> {
    Employee.find()
        .then(response => {
            res.json({
                response
            });
        })
        .catch(error => {
            res.json({
                message: 'An error Occured'
            });
        });
}
// show single user
const show = (req, res, next) =>{
    let employeeID = req.body.employeeID;
    Employee.findById(employeeID)
        .then(response => {
            res.json({
                response
            });
        })
        .catch(error => {
            res.json({
                message: 'An error Ocurred!'
            });
        });
}
// add new users
const store = (req, res, next) => {
    let employee = new Employee({
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        email: req.body.email,
        phone: req.body.phone,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender
    })
    if(req.files) {
        let path = ''
        req.files.foreach(function(files, index, arr){
            path = path + files.path + ','
        })
        path = path + files.path+ '.'
        employee.avatar = path
    }
    employee.save()
    .then(response =>{
        res.json({
            message: 'Employee Added Successfully!'
        })
    })
    .catch(error =>{
        escape.json({
            message: 'An error Occured!'
        })
    })
   
}
// update a user
const update = (req, res, next) => {
    let uemployeeID = req.res.employeeID;

    let updateData = {
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        email: req.body.email,
        phone: req.body.phone,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender
    }

    Employee.findByIdAndUpdate(employeeID, { $set: updatedData})
        .then(() => {
            res.json({
                message: 'Employee updated successfully!'
            });
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            });
        });
}

// delete a user
const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID;
    User.findByIdAndRemove(employeeID)
        .then(() => {
            req.json({
                message: 'Employee deleted successfully!'
            });
        })
        .catch(error => {
            req.json({
                message: 'An error Occured!'
            });
        });
}

module.exports = {
    index, show, store, update, destroy
}