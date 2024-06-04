const service = require('./service.js');
const FilteringRepository = require('../repositories/filtering.repository.js');
class FilteringService extends service {
    constructor(Repository) {
        super(Repository);
    }
}

module.exports = new FilteringService(FilteringRepository);