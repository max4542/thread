const express = require('express');
const cors = require('cors');
const categoryRoutes = require('./Routes/categoryRoutes');
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');
const AuthMiddleware = require('./middleware/authorization');
const app = express();
const PORT = 5050;

// Set up CORS to only allow requests from port 3000
const corsOptions = {
  origin: 'http://localhost:3000',  // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authRoutes);
app.use(AuthMiddleware);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
