// const Controller = require('./controller.js');
// const LoginService = require('../services/login.service.js');

// class LoginController extends Controller {
//     constructor(service) {
//         super(service);
//         console.log('Controller initialized with service:', service);
//     }
//     async login(req, res, next) {
//         try {
//             console.log('1');
//             const loginData = req.body;
//             console.log(loginData);
//             const result = await this.service.login(loginData);
//              console.log('3');
//             if (result.hasError) {
//                 res.status(404).send('Error');
//             } else {
//                 res.status(200).send(result.data);
//             }
//         } catch (error) {
//             console.log('2');
//             res.status(500).send('Server Error');
//         }
//     }
// }

// module.exports = new LoginController(LoginService);


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
            console.log('1');
            const loginData = req.body;
            console.log(loginData);
            const result = await this.service.login(loginData);
            console.log('3');
            if (result.hasError) {
                res.status(404).send('Error');
            } else {
                res.status(200).send(result.data);
            }
        } catch (error) {
            console.log('2');
            res.status(500).send('Server Error');
        }
    }
}

module.exports = new LoginController(loginServiceInstance);

