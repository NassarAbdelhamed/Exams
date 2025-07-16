import { Router } from "express";
import examsRouter from './exams.mjs'
import questionsRouter from './questions.mjs'

const router =Router()

router.use(examsRouter)
router.use(questionsRouter)

export default router