import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GROQ_API;

app.post("/generate", async (req, res) => {
    const userFeeling = req.body.text;

    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "mixtral-8x7b-32768",
                messages: [
                    {
                        role: "user",
                        content: `The user feels: ${userFeeling}. 
                        Write a short 5–8 line Islamic comforting advice. 
                        Use simple language, light wisdom, no hard Arabic.`
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({
            output: response.data.choices[0].message.content
        });

    } catch (error) {
        res.json({ output: "Error generating story." });
    }
});

app.listen(3000, () => console.log("Backend running on port 3000"));
