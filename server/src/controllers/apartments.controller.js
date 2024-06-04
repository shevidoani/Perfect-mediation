const Controller = require('./controller.js');
const apartmentsService= require('../services/apartments.service.js');
class ApartmentsController extends Controller {
    constructor(service) {
        super(service);
    }
    
}

module.exports = new ApartmentsController(apartmentsService);