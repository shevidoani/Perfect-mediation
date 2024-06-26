const Controller = require('./controller.js');
const LoginService = require('../services/login.service.js');
const usersRepository = require('../repositories/users.repository');
const passwordRepository = require('../repositories/passwords.repository');
const usersPermissionsRepository = require('../repositories/usersPermissions.repository');

// יצירת אינסטנס של LoginService עם הארגומנטים הנכונים
const loginServiceInstance = new LoginService(usersRepository, usersPermissionsRepository, passwordRepository);

class LoginController extends Controller {
    constructor(service) {
        super(service);
        console.log('Controller initialized with service:', service);
    }
    async login(req, res, next) {
        try {
            const loginData = req.body;
            const result = await this.service.login(loginData);
            if (result.hasError) {
                res.status(404).send('Error');
            } else {
                res.status(200).send(JSON.stringify(result));
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = new LoginController(loginServiceInstance);

