import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()



const app = express()
const PORT = process.env.API_PORT || 3001

app.use(express.json())
app.use(cors())


app.get('/', (req,res)=>{
    res.send("PAGE OK")
})


app.listen(PORT, async() =>{
    console.log(`Server running on http://localhost:${PORT}`)
})