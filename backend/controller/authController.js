const ResponseTrait = require('../traits/responseTrait');
const twilioClient = require('twilio')(require('../config/twilio').twilio.accountSid, require('../config/twilio').twilio.authToken);
const { TWILIO_VERIFY_SERVICE_SID,JWT_SECRET } = process.env;
const UserRepository = require('../Repository/userRepository');
const jwt = require('jsonwebtoken');
const userRepo = new UserRepository();
class AuthController {
  static async sendotp(req, res) {
    const { countryCode, phoneNumber } = req.body;
    if (!countryCode || !phoneNumber) return ResponseTrait.error(res, 'Country code and phone number are required', 400);
    try {
      const verification = await twilioClient.verify.v2.services(TWILIO_VERIFY_SERVICE_SID).verifications.create({ to: `${countryCode}${phoneNumber}`, channel: 'sms' });
      return verification.status === 'pending' ? ResponseTrait.success(res, null, 'OTP sent successfully') : ResponseTrait.error(res, 'Failed to send OTP', 500);
    } catch (error) {
      return ResponseTrait.error(res, 'An error occurred while sending OTP', 500);
    }
  }

  static async verifyotp(req, res) {
    const { countryCode, phoneNumber, otp } = req.body;
    if (!countryCode || !phoneNumber || !otp) return ResponseTrait.error(res, 'Country code, phone number, and OTP are required', 400);
    try {
      const verificationCheck = await twilioClient.verify.v2.services(TWILIO_VERIFY_SERVICE_SID).verificationChecks.create({ to: `${countryCode}${phoneNumber}`, code: otp });
      if (verificationCheck.status !== 'approved') {
        return ResponseTrait.error(res, 'Invalid OTP', 400);
      }
      const user = await userRepo.findOne({where:{ phone_number : phoneNumber} });
      if (!user) return ResponseTrait.error(res, 'User not found. Please register first.', 404);
      const token = jwt.sign(
        { id: user.id, name: user.name, githubUsername: user.github_username, email: user.email, image: user.image, phoneNumber: user.phone_number, admin: user.admin },
        JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' }
      );
      return ResponseTrait.success(res, { token }, 'OTP verified and JWT generated successfully');
    } catch (error) {
      console.log(error);
      return ResponseTrait.error(res, 'An error occurred while verifying OTP', 500);
    }
  }
  static async register(req, res) {
    const { name, email, github_username, phone_number, admin = '0' } = req.body;

    // Check if all fields are provided
    if (!name || !email  || !phone_number) return ResponseTrait.error(res, 'Name, email and phone number are required', 400);

    try {
      const existingUserByEmail = await userRepo.findOne({ where: { email } });
      if (existingUserByEmail) return ResponseTrait.error(res, 'Email is already registered', 400);

      const existingUserByPhone = await userRepo.findOne({ where: { phone_number } });
      if (existingUserByPhone) return ResponseTrait.error(res, 'Phone number is already registered', 400);

      const newUser = await userRepo.create({name,email,github_username,phone_number,admin});

      const token = jwt.sign(
        { id: newUser.id, name: newUser.name, githubUsername: newUser.github_username, email: newUser.email, image: newUser.image, phoneNumber: newUser.phone_number, admin: newUser.admin },
        JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' }
      );

      return ResponseTrait.success(res, { token }, 'User registered successfully and JWT generated');
    } catch (error) {
      console.log(error);
      return ResponseTrait.error(res, 'An error occurred during registration', 500);
    }
  }

}

module.exports = AuthController;
