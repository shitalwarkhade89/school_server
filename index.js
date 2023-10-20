import express from "express";
import mongoose, { model, Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Student from "./models/student.js";


const app = express();
app.use(express.json());

const PORT = 5000;

// MongoDB Connection

const connectMongoDb = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if (conn) {
        console.log('Mongodb connected succesfully.');
    }
};
connectMongoDb();



app.get('/health', (req, res) => {
    res.json({ status: 'All good, All set' });
});
// get students
app.get('/students', async (req, res) => {
    const students = await Student.find()

    res.json({
        success: true,
        data: students,
        message: 'Successfully fetched all students',
    })
});


// post student
app.post('/student', async (req, res) => {
    const { name, age, mobile, email } = req.body;
    if (!name) {
        return res.json({
            success: false,
            message: 'name is required',
        })
    }

    if (!age) {
        return res.json({
            success: false,
            message: 'age is required',
        })
    }

    if (!mobile) {
        return res.json({
            success: false,
            message: 'mobile is required',
        })
    }

    if (!email) {
        return res.json({
            success: false,
            message: 'email is required',
        })
    }
    // instance of module
    const stud = new Student({
        name: name,
        age: age,
        mobile: mobile,
        email: email,
    })
    const savedStudent = await stud.save();
    res.json({
        success: true,
        data: savedStudent,
        message: 'successfully added  new students',
    })
});
// get student
app.get('/student', async (req, res) => {
    const { email } = req.query;

    const savedStudent = await Student.findOne({ email: email })

    res.json({
        success: true,
        data: savedStudent,
        message: 'successfully fetched student',
    })
});



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
});