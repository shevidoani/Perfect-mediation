const Controller = require('./controller.js');
const imagesService= require('../services/images.service.js');
class ImagesController extends Controller {
    constructor(service) {
        super(service);
    }
    
}

module.exports = new ImagesController(imagesService);