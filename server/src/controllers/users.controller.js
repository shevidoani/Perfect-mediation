const Controller = require('./controller.js');
const usersService= require('../services/users.service.js');
// const bcrypt = require('bcrypt');
class UsersController extends Controller {
    constructor(service) {
        super(service);
    }
    async getByEmail(req, res, next) {
        const email = req.params.email;
    try {
        const result = await this.service.getByEmail(email);
        if (result.hasError) {
            res.status(404).send('Error');
        }
        else {
            res.status(200).send(result.data);
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
    }
}

module.exports = new UsersController(usersService);