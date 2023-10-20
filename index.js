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
const Student = model('Student',studentSchema);

app.get('/health', (req, res) => {
    res.json({ status: 'All good, All set' });
});
// get students
app.get('/students', async(req, res) => {
    const students =  await student.find()

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
    const stud =  new Student({
        name:name,
        age:age,
        mobile:mobile,
        email:email,
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

    const savedStudent = await Student.findOne({email:email})
  
    res.json({
        success: true,
        data: savedStudent,
        message: 'successfully fetched student',
    })
});



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
});