import mongoose from "mongoose";

const examSchema= new mongoose.Schema({
    sub:{
        type:String,
        require:true,
        unique: true
    },
    des:{
        type:String
    }
})


const Exam = mongoose.model('Exam',examSchema)
export default Exam