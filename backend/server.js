const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const signupRouter = require('./api/signup'); // Adjust path as per your signup router location
const loginRouter = require('./api/login'); // Adjust path as per your login router location

// Initialize Express app
const app = express();
const PORT = 5000;
const MONGODB_URI = 'mongodb://localhost:27017/online_code_editor';

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
