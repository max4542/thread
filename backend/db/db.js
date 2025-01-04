/* eslint no-undef: "off" */

require('dotenv').config(); // Load environment variables
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const { Sequelize } = require('sequelize');

// Configure database connection using .env variables
const config = {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// Initialize Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: config.pool,
 // timezone: process.env.TIMEZONE, // Load timezone from .env
});

// Authenticate database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Configure Nodemailer using .env variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Load email user from .env
    pass: process.env.EMAIL_PASSWORD, // Load email password from .env
  },
});

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/image"), // Adjust path if necessary
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 3000000 }, // Limit file size to 3MB
});

// Export modules
module.exports = { sequelize, transporter, upload };
