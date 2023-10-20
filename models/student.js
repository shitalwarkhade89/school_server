import { Schema,model } from "mongoose";

// schema

const studentSchema = new Schema({
    name:String ,
    age:Number,
    mobile: String,
    email: String,
 });
 
 // model
 const Student = model('Student',studentSchema);

 export default Student;