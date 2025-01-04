const BaseRepository = require('./baseRepository');
const User = require('../models/userconnection'); // Ensure correct path

class userConnectionRepository extends BaseRepository {
    constructor() {
        super(User);
    }

}

module.exports =  userConnectionRepository;