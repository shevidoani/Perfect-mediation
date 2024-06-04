const service = require('./service.js');
const ApatrmentRepository = require('../repositories/apartments.repository.js');
class ApartmentsService extends service {
    constructor(Repository) {
        super(Repository);
    }
}

// const usersServiceInstance = new UsersService(usersRepository);

// // דוגמה לשימוש בפונקציה getByEmail
// usersServiceInstance.getByEmail('yael@gmail.com').then(user => {
//     console.log(user);
// }).catch(error => {
//     console.error(error);
// });

module.exports = new ApartmentsService(ApatrmentRepository);