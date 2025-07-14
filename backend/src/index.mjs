import express, { json } from 'express'
import mongodb from './conf/db.mjs'
import cors from 'cors'
import Exam from './models/exams.mjs'
import question from './models/question.mjs'
const app = express()

app.use(express.json())
mongodb()

app.use(cors())
app.get('/exams', async (req, res) => {
    try {
        const exams = await Exam.find()
        exams ? res.status(200).send(exams) : res.status(200).send([])
    }
    catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
})

app.post('/exams', async (req, res) => {
    try {
        const exam = new Exam(req.body)
        const inst = await exam.save()
        res.status(201).send(inst)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/questions',async(req,res)=>{
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

 app.get('/find/:id',async(req,res)=>{
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

    app.post('/check-answers', async (req, res) => {
    try {
        const { answers } = req.body;
        
        if (!Array.isArray(answers)) {
            return res.status(400).json({ error: 'Input must be an array of answers' });
        }

        const questionIds = answers.map(a => a.questionId);

        const questions = await question.find({
            _id: { $in: questionIds }
        });

        const questionMap = {};
        questions.forEach(q => {
            questionMap[q._id.toString()] = q;
        });

        let correctCount = 0;
        const results = answers.map(submission => {
            const question = questionMap[submission.questionId];
            if (!question) {
                return {
                    questionId: submission.questionId,
                    correct: false,
                    error: 'Question not found'
                };
            }

            // Fixed: Using 'correct' instead of 'correct_answer'
            const isCorrect = String(question.correct).trim().toLowerCase() === 
                             String(submission.answer).trim().toLowerCase();
            
            if (isCorrect) correctCount++;
            
            return {
                questionId: submission.questionId,
                correct: isCorrect,
                correctAnswer: question.correct,
                userAnswer: submission.answer
            };
        });

        res.json({
            totalQuestions: answers.length,
            correctCount,
            score: `${correctCount}/${answers.length}`,
            percentage: Math.round((correctCount / answers.length) * 100),
            details: results
        });

    } catch (err) {
        console.error('Error checking answers:', err);
        res.status(500).json({ 
            error: 'Server error',
            details: err.message 
        });
    }
});
app.get('/reset',async (req,res)=>{
    try{
        await Exam.deleteMany()
        await question.deleteMany()
        res.status(200).send('deleted')
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
const Ports = process.env.Port || 5000

app.listen(Ports, () => { console.log(`server is on on port ${Ports}`) })