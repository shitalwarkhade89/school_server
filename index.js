import express from "express";
import mongoose, {model,Schema} from 'mongoose';

const app = express();
app.use(express.json());

const PORT = 5000;

// MongoDB Connection
const MONGODB_URI ='mongodb+srv://shitalwarkhade89:eYoJqYA6NrIJOet5@igcp.agawvrs.mongodb.net/school';
const connectMongoDb =async() => {
 const conn = await mongoose.connect( MONGODB_URI)
 if (conn){
    console.log('Mongodb connected succesfully.');
 }
};
connectMongoDb();

// schema
const studentSchema = new Schema({
   name:String ,
   age:Number,
   mobile: String,
   email: String,
});

// model
const student = model('student',studentSchema);

app.get('/health', (req, res) => {
    res.json({ status: 'All good, All set' });
});
// get students
app.get('/students', (req, res) => {
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
    const newStudent =  new student({
        name:name,
        age:age,
        mobile:mobile,
        email:email,
    })
    const savedStudent = await newStudent.save();
    res.json({
        success: true,
        data: savedStudent,
        message: 'successfully added students',
    })
});
// get student
app.get('/student', (req, res) => {
    const { id } = req.query;
    let student = null;

    students.forEach((stud) => {
        if (stud.id == id) {
            student = stud;
        }

    })
    if(student == null){
       return res.json({
        success: false,
        message:'student not found',
       })
    }
    res.json({
        success: true,
        data: student,
        message: 'successfully fetched student',
    })
});



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
});