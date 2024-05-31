const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');  // Importing the correct classes
const cors = require('cors');
require('openai');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const pdfSchema = new mongoose.Schema({
    filename: String,
    content: String
});

const PDF = mongoose.model('PDF', pdfSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {     //cb -> callback
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    const dataBuffer = await pdfParse(file.path);
    const newPDF = new PDF({
        filename: file.originalname,
        content: dataBuffer.text
    });
    await newPDF.save();
    res.json({ filename: file.originalname });
});

app.post('/ask', async (req, res) => {
    try {
        console.log("Initializing OpenAI configuration...");
        const { filename, question } = req.body;
        const pdf = await PDF.findOne({ filename });

        if (!pdf) {
            return res.status(404).json({ error: 'PDF not found' });
        }

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        console.log("OpenAI configuration initialized.");

        const response = await openai.createCompletion({
            model: "gpt-3.5-turbo-instruct",
            prompt: `Based on the following content, answer the question:\n\n${pdf.content}\n\nQuestion: ${question}`,
            max_tokens: 150,
        });

        res.json({ question, answer: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error("Error in /ask route:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message });
    }
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
