import mongoose from "mongoose";

const Question= new mongoose.Schema({
    examId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Exam' ,
        required :true
    } ,

    header:{
        type:String,
        required:true 
    } ,
    correct:{
        type:String,
        required:true
    },
    wrong1:{
        type:String,
        required:true
    },
    wrong2:{
        type:String,
    },
    wrong3:{
        type:String,
    }
})

export default mongoose.model('Question',Question)