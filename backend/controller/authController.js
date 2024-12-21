const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../Repository/userRepository');
const ResponseTrait = require('../traits/responseTrait');

const userRepo = new UserRepository();

class AuthController {

  static async register(req, res) {
    try {
      const { name, email, githubUsername, password, phoneNumber } = req.body;

      // Check if user exists
      const existingUser = await userRepo.findOne({where : {email: email , github_username:githubUsername}});
      if (existingUser) return ResponseTrait.error(res, 'User exists', 400);

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userRepo.create({ name, email, github_username:githubUsername, password: hashedPassword, phone_number:phoneNumber });

      return ResponseTrait.success(res, newUser, 'User registered', 201);
    } catch (error) {
      return ResponseTrait.error(res, error.message, 400);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Find user and validate password
      const user = await userRepo.findOne({where:{ email :email} });
      if (!user) return ResponseTrait.error(res, 'User not found', 404);
      if (!await bcrypt.compare(password, user.password)) return ResponseTrait.error(res, 'Invalid credentials', 401);

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, name: user.name, githubUsername: user.github_username, email: user.email, image: user.image, phoneNumber: user.phone_number, admin: user.admin },
        process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' }
      );

      return ResponseTrait.success(res, { token }, 'Login successful');
    } catch (error) {
      return ResponseTrait.error(res, error.message, 400);
    }
  }
}

module.exports = AuthController;
