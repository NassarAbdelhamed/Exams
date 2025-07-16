import { Router } from "express";

import Exam from "../models/exams.mjs";
import question from "../models/question.mjs";

const router =Router()

router.post('/questions',async(req,res)=>{
    try{
   const  quest = new question(req.body)
   const q=await quest.save()
   res.status(201).send(q)
    }
    catch(err){
       console.log(err)
       res.status(500).send("error")
    }
})

 router.get('/questions/:id',async(req,res)=>{
        try{
        const {id} =req.params;
         console.log('Received ID:', id, 'Type:', typeof id);
        const exam= await Exam.exists({_id:id})
        if(!exam ){return res.sendStatus(401)}
        const questions=await question.find({examId:id})
        questions ? res.send(questions):res.send([])
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    })
export default router