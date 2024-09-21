import express from "express";
import cors from "cors";
import { getAiResponse } from "./predict.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const sensor_ip = "192.168.4.1";

app.get("/", async (req, res) => {
  //   console.table(req.body);

  try {
    console.log("this is runing");
    const sensor_data = await axios.get(`http://${sensor_ip}:80`);
    console.log(sensor_data.data);
    res.send(sensor_data.data);
  } catch (error) {
    console.log("server is not running");
  }
});

// app.post("/", (req, res) => {
//   const { sensor_id, temperature, humidity } = req.body;

//   //   if (!sensor_id || !temperature || !humidity) {
//   //     return res.status(400).json({ error: "Missing required fields" });
//   //   }

//   console.table({
//     sensor_id: sensor_id,
//     temperature: temperature,
//     humidity: humidity,
//   });

//   // Here you could store data in a database, e.g., using MySQL, MongoDB, etc.
//   // db.query(...);

//   console.log("Sensor data received and processed!");
//   res.send("Sensor data received and stored successfully");
// });

app.post("/crop", async (req, res) => {
  const data = req.body;

  //   console.log(process.env.API_KEY);

  console.log("Data received from user : ", data);

  const prompt = `The data sent by the user is as follows:\n 
    Nitrogen: ${data.nitrogen}
    Phosphorous: ${data.phosphorous}
    Potassium: ${data.potassium}
    Temperature: ${data.temperature}
    Humidity: ${data.humidity}
    pH: ${data.ph}
    Rainfall: ${data.rainfall}
    `;

  getAiResponse(prompt)
    .then((response) => {
      res.send(response).status(200);
    })
    .catch((error) => {
      res.status(500).send("Error in getting response from AI model.");
    });
});

app.listen(3000, () => {
  console.log("AgriAI backend is running on port 3000");
});
