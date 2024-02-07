const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/quizDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Mongoose schema and model
const questionSchema = new mongoose.Schema({
  text: String,
  difficulty: String,
});
const Question = mongoose.model('Question', questionSchema);

// Multer configuration for file upload
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// File upload route
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const pdfPath = `uploads/${req.file.filename}`;
  fs.readFile(pdfPath, async (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read the uploaded file' });
    }

    try {
      const pdfData = await pdf(data);
      const questions = extractQuestionsFromPDF(pdfData);
      await Question.insertMany(questions.map(text => ({ text, difficulty: req.body.difficulty })));
      res.json({ questions });
    } catch (error) {
      res.status(500).json({ error: 'Failed to parse the PDF file' });
    }
  });
});

// API endpoint to fetch questions based on difficulty level
app.get('/api/questions/:difficulty', async (req, res) => {
  const { difficulty } = req.params;
  try {
    const questions = await Question.find({ difficulty });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Helper function to extract questions from PDF data (example implementation)
function extractQuestionsFromPDF(pdfData) {
  // Implement logic to extract questions from PDF data
  // For example:
  return pdfData.text.split('\n').filter(line => line.trim().length > 0);
}

// Add questions from PDFs to MongoDB
async function addQuestionsFromPDFs() {
  try {
    const easyQuestionsData = fs.readFileSync('EASY QUESTIONS.pdf');
    const mediumQuestionsData = fs.readFileSync('MEDIUM QUESTION1.pdf');
    const hardQuestionsData = fs.readFileSync('HARD QUESTIONS.pdf');

    const easyQuestions = await pdf(easyQuestionsData);
    const mediumQuestions = await pdf(mediumQuestionsData);
    const hardQuestions = await pdf(hardQuestionsData);

    await Question.insertMany(easyQuestions.text.split('\n').filter(line => line.trim().length > 0).map(text => ({ text, difficulty: 'easy' })));
    await Question.insertMany(mediumQuestions.text.split('\n').filter(line => line.trim().length > 0).map(text => ({ text, difficulty: 'medium' })));
    await Question.insertMany(hardQuestions.text.split('\n').filter(line => line.trim().length > 0).map(text => ({ text, difficulty: 'hard' })));

    console.log('Questions added to MongoDB');
  } catch (error) {
    console.error('Error adding questions to MongoDB:', error);
  }
}

// Run the function to add questions from PDFs to MongoDB
addQuestionsFromPDFs();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
