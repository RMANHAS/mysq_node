const express=require('express')
const { getStudents, getStudentsById, createStudent, updatestudent, deleteStudent } = require('../controller/studentController')

//router object
const router=express.Router()

//routes

//get all student list 
router.get('/getall',getStudents)

//get student by id
router.get('/get/:id',getStudentsById)

//create student 
router.post('/create',createStudent)

//update student
router.put('/update/:id',updatestudent)

//deletw student
router.delete('/delete/:id',deleteStudent)

module.exports=router 