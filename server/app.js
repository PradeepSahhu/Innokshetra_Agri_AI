import express from "express"
import cors from "cors"
import { getAiResponse } from "./predict"


const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("AgriAI backend is up!")
})

app.post("/crop", (req, res) => {
    const data = req.body

    console.log("Data received from user : ", data)

    const prompt = `The data sent by the user is as follows:\n 
    Nitrogen: ${data.nitrogen}
    Phosphorous: ${data.phosphorous}
    Potassium: ${data.potassium}
    Temperature: ${data.temperature}
    Humidity: ${data.humidity}
    pH: ${data.ph}
    Rainfall: ${data.rainfall}
    `

    getAiResponse(prompt).then((response) => {
        res.send(response).status(200)
    }).catch((error) => {
        res.status(500).send("Error in getting response from AI model.")
    })
})

app.listen(3000, () => {
    console.log("AgriAI backend is running on port 3000")
})