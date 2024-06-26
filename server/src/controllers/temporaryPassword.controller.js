const Controller = require('./controller.js');
const temporaryPasswordService= require('../services/temporaryPassword.service.js');
const bcrypt = require('bcrypt');
class TemporaryPasswordController extends Controller {
    constructor(service) {
        super(service);
    }
}

module.exports = new TemporaryPasswordController(temporaryPasswordService);