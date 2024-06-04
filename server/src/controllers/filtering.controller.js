const Controller = require('./controller.js');
const FilteringService= require('../services/filtering.service.js');
class FilteringController extends Controller {
    constructor(service) {
        super(service);
    }
}

module.exports = new FilteringController(FilteringService);