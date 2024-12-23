const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../Repository/userRepository');
const ResponseTrait = require('../traits/responseTrait');
const twilio = require("../config/twilio");
const userRepo = new UserRepository();

class AuthController {
  static async sendotp(req, res) {
    const { countryCode, phoneNumber } = req.body;
    if (!countryCode || !phoneNumber) return ResponseTrait.error(res, 'Country code and phone number are required', 400);
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    try {
      const verification = await twilio.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID).verifications.create({ to: fullPhoneNumber, channel: 'sms' });
      if (verification.status === 'pending') return ResponseTrait.success(res, null, 'OTP sent successfully');
      return ResponseTrait.error(res, 'Failed to send OTP', 500);
    } catch (error) {
      return ResponseTrait.error(res, error.message, 500);
    }
  }

  static async verifyotp(req, res) {
    const { countryCode, phoneNumber, otp } = req.body;
    if (!countryCode || !phoneNumber || !otp) return ResponseTrait.error(res, 'Country code, phone number, and OTP are required', 400);
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    try {
      const verificationCheck = await twilio.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID).verificationChecks.create({ to: fullPhoneNumber, code: otp });
      if (verificationCheck.status === 'approved') return ResponseTrait.success(res, null, 'OTP verified successfully');
      return ResponseTrait.error(res, 'Invalid OTP', 400);
    } catch (error) {
      return ResponseTrait.error(res, error.message, 500);
    }
  }
}

module.exports = AuthController;
