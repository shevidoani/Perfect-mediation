const Controller = require('./controller.js');
const ApartmentsWaitingService= require('../services/apartmentsWaiting.service.js');
class ApartmentsWaitingController extends Controller {
    constructor(service) {
        super(service);
    }
}

module.exports = new ApartmentsWaitingController(ApartmentsWaitingService);