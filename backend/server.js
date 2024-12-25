const express = require('express');
const cors = require('cors');
const categoryRoutes = require('./Routes/categoryRoutes');
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');
const AuthMiddleware = require('./middleware/authorization');
const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//route
app.use('/api', authRoutes);
app.use(AuthMiddleware);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

