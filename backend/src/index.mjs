import express, { json } from 'express'
import mongodb from './conf/db.mjs'
import Exam from './models/exams.mjs'
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

const Ports = process.env.Port || 3000

app.listen(Ports, () => { console.log(`server is on on port ${Ports}`) })

