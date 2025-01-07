const BaseRepository = require('./baseRepository');
const Message = require('../models/message'); // Ensure correct path

class messageRepository extends BaseRepository {
    constructor() {
        super(Message);
    }

}

module.exports =  messageRepository;