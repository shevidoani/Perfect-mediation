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

module.exports = new UsersService(usersRepository);