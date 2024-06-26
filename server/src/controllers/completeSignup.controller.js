const Controller = require('./controller.js');
const SignupService = require('../services/signup.service.js');
const usersRepository = require('../repositories/users.repository');
const passwordRepository = require('../repositories/passwords.repository');
const usersPermissionsRepository = require('../repositories/usersPermissions.repository');
const permissionsRepository = require('../repositories/permissions.repository.js');
const temporaryPasswordsRepository= require('../repositories/temporaryPasswords.repository.js');
const signupServiceInstance = new SignupService(usersRepository, usersPermissionsRepository
    , passwordRepository, permissionsRepository, temporaryPasswordsRepository);

class CompleteSignupController extends Controller {
    constructor(service) {
        super(service);
        //this.service = service;
        console.log('Controller initialized with service:', service);
    }
    async completeSignup(req, res, next) {
        try {
            const completeSignupData = req.body;
            const result = await this.service.completeSignup(completeSignupData);
            if (result.hasError) {
                res.status(404).send(result.error);
            } else {
                console.log(`result.data ${JSON.stringify(result)}`);
                res.status(200).send(JSON.stringify(result));
            }
        } catch (error) {
            res.status(500).send('Server Error');
        }
    }
}

module.exports =new CompleteSignupController(signupServiceInstance);
//module.exports = SignupController;
