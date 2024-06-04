const service = require('./service.js');
const ImagesRepository = require('../repositories/images.repository.js');
class ImagesService extends service {
    constructor(Repository) {
        super(Repository);
    }
}



module.exports = new ImagesService(ImagesRepository);