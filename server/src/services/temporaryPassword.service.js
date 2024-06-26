const service = require('./service.js');
const temporaryPasswordRepository = require('../repositories/temporaryPasswords.repository.js');
class TemporaryPasswordService extends service {
    constructor(Repository) {
        super(Repository);
    }
}


module.exports = new TemporaryPasswordService(temporaryPasswordRepository);