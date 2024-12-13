const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/yourDatabase');

then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Create Schema for storing student data
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String
});

// Create model
const Student = mongoose.model('Student', studentSchema);

// POST endpoint to handle form submission
app.post('/submit', async (req, res) => {
  const { name, email, course } = req.body;

  // Create new student record
  const newStudent = new Student({ name, email, course });

  try {
    await newStudent.save();
    res.status(200).send('Student data saved successfully!');
  } catch (error) {
    res.status(400).send('Error saving student data!');
  }
});

// Server listening on port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});