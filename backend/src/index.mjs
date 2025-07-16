import express from 'express'
import mongodb from './conf/db.mjs'
import cors from 'cors'
import router from './routes/router.mjs'
const app = express()

app.use(express.json())
mongodb()
app.use(cors())
app.use(router)



const Ports = process.env.Port || 5000

app.listen(Ports, () => { console.log(`server is on on port ${Ports}`) })