const BaseRepository = require('./baseRepository');
const Category = require('../models/categroyModel'); // Ensure correct path

class categoryRepository extends BaseRepository {
    constructor() {
        super(Category);
    }

}

module.exports =  categoryRepository;