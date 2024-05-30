
class Service {
    constructor(Repository) {
        return this.Repository = Repository;
    }
    async create(data) {
        try {
            return this.Repository.create(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    async getAll() {
        try {
           return this.Repository.getAll();
            
        }
        catch (err) {
            console.log(err);
        }
    }
    async getById(id) {
        try {
            return this.Repository.getById(id);
        }
        catch (err) {
            return console.log(err);
        }
    }

    // async getByEmail(email) {
    //     try {
    //         return this.Repository.getByEmail(email);
    //     }
    //     catch (err) {
    //         return console.log(err);
    //     }
    // }
  
    async update(data) {
        try {
            return this.Repository.update(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return this.Repository.delete(id);
        }
        catch (err) {
            console.log(err);
        }
    }
}
module.exports = Service;