const service = require('./service.js');
const usersRepository = require('../repositories/users.repository.js');
class UsersService extends service {
    constructor(Repository) {
        super(Repository);
    }
    async getByEmail(email) {
        try {
            return this.Repository.getByEmail(email);
        }
        catch (err) {
            console.log(err);
        }
    }
}

// const usersServiceInstance = new UsersService(usersRepository);

// // דוגמה לשימוש בפונקציה getByEmail
// usersServiceInstance.getByEmail('yael@gmail.com').then(user => {
//     console.log(user);
// }).catch(error => {
//     console.error(error);
// });

module.exports = new UsersService(usersRepository);