const express = require('express');
const cors = require('cors');
const http = require('http'); // Import http for creating a server
const setupSocketIO = require('./socket/io'); // Importing Socket.IO setup function
const categoryRoutes = require('./Routes/categoryRoutes');
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');
const AuthMiddleware = require('./middleware/authorization'); // Ensure AuthMiddleware is properly implemented

const app = express();
const PORT = process.env.PORT || 5050; // Port for Express server (same port for Socket.IO)

// Set up CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', authRoutes); // Auth routes without requiring AuthMiddleware
app.use(AuthMiddleware); // Ensure authenticated routes require middleware
app.use('/api', categoryRoutes); // Category routes
app.use('/api', userRoutes); // User routes


// Create HTTP server for both Express and Socket.IO
const server = http.createServer(app);

// Setup Socket.IO with the existing server
setupSocketIO(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

