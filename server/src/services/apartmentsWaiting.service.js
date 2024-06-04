const service = require('./service.js');
const ApartmentsWaitingRepository = require('../repositories/apartmentsWaiting.repository.js');
class ApartmentsWaitingService extends service {
    constructor(Repository) {
        super(Repository);
    }
}

module.exports = new ApartmentsWaitingService(ApartmentsWaitingRepository);