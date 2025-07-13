import express, { json } from 'express'
import mongodb from './conf/db.mjs'
import Exam from './models/exams.mjs'
import question from './models/question.mjs'
const app = express()

app.use(express.json())
mongodb()

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
        const { answers } = req.body; // Expects array of {questionId, answer}
        
        if (!Array.isArray(answers)) {
            return res.status(400).json({ error: 'Input must be an array of answers' });
        }

        // Get all question IDs from the submission
        const questionIds = answers.map(a => a.questionId);

        // Find all questions in one query
        const questions = await question.find({
            _id: { $in: questionIds }
        });

        // Create a map for quick lookup
        const questionMap = {};
        questions.forEach(q => {
            questionMap[q._id.toString()] = q;
        });

        // Check each answer
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

            const isCorrect = question.correct_answer === submission.answer;
            if (isCorrect) correctCount++;
            
            return {
                questionId: submission.questionId,
                correct: isCorrect,
                correctAnswer: question.correct_answer,
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
    
const Ports = process.env.Port || 3000

app.listen(Ports, () => { console.log(`server is on on port ${Ports}`) })