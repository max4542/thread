const BaseRepository = require('./baseRepository');
const User = require('../models/user'); // Ensure correct path

class userRepository extends BaseRepository {
    constructor() {
        super(User);
    }

}

module.exports =  userRepository;