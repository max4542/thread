const UserRepository = require('../Repository/userRepository');
const ResponseTrait = require('../traits/responseTrait');

const userRepo = new UserRepository();

async function getUsers(req, res) {
  try {
    const users = await userRepo.findAll();
    return ResponseTrait.success(res, users, 'Users fetched successfully');
  } catch (error) {
    return ResponseTrait.error(res, error.message, 400);
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await userRepo.update(req.params.id, req.body);
    return ResponseTrait.success(res, updatedUser, 'User updated successfully');
  } catch (error) {
    return ResponseTrait.error(res, error.message, 400);
  }
}


module.exports = {  getUsers, updateUser };
