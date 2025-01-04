const { v4: uuidv4 } = require('uuid'); // For UUID
const UserRepository = require('../Repository/userRepository');
const ResponseTrait = require('../traits/responseTrait');
const twilioClient = require('twilio')(require('../config/twilio').twilio.accountSid, require('../config/twilio').twilio.authToken);
const { TWILIO_VERIFY_SERVICE_SID } = process.env;
const userRepo = new UserRepository();

async function getUsers(req, res) {
  try {
    const users = await userRepo.findAll(); // Fetches all users
    return res.status(200).json({
      message: 'Users fetched successfully',
      data: users, // Sends an array of users in the `data` field
    });
  } catch (error) {
    return ResponseTrait.error(res, error.message, 400); // Sends an error response
  }
}

async function updateUser(req, res) {
  try { const updatedUser = await userRepo.update(req.params.id, req.body); return ResponseTrait.success(res, updatedUser, 'User updated successfully'); }
  catch (error) { return ResponseTrait.error(res, error.message, 400); }
}

async function createNewFactor(req, res) {
  try {
    const entityId = uuidv4(); // Generate UUID for the entity
    const newFactor = await twilioClient.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .entities(entityId) // Use dynamically generated UUID
      .newFactors.create({
        factorType: "totp", 
        friendlyName: req.user.name,
      });
      return ResponseTrait.success(res, newFactor, '2fa');
  } catch (error) {
    console.error("Error creating TOTP factor:", error.message);
  }
}

async function verfiyNewFactor(req, res) {
  try {
    const entityId = uuidv4(); // Generate UUID for the entity
    const Factor = await twilioClient.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .entities(entityId) // Use dynamically generated UUID
      .newFactors.create({
        factorType: "totp", 
        friendlyName: req.user.name,
      });
      return ResponseTrait.success(res, Factor, '2fa');
  } catch (error) {
    console.error("Error creating TOTP factor:", error.message);
  }
}

module.exports = { getUsers, updateUser, createNewFactor , verfiyNewFactor};
