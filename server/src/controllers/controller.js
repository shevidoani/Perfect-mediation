
class Controller {
    constructor(service) {
        this.service = service;
    }
    async create(req, res, next) {
        const newData = req.body;
        try {
            const result = await this.service.create(newData);
            if (result.insertId!=-1) {
                res.status(200).send(`${result.insertId}`);
            } else {
                res.status(404).send('failed to add');
            }
        } catch (error) {
            res.status(500).send('Server Error');
        }
    }
    async getAll(req, res, next) {
        try {
            const result = await this.service.getAll();
            if (result.hasError) {
                res.status(404).send('Error');
            }
            else {
                res.status(200).send(result.data);
            }
        } catch (error) {
            res.status(500).send('Server Error');
        }
    }
    async getById(req, res, next) {
        const id = req.params.id;
    try {
        const result = await this.service.getById(id);
        if (result.hasError) {
            res.status(404).send('Error');
        }
        else {
            res.status(200).send(result.data);
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
    }
    
    async update(req, res, next) {
        const id = req.params.id;
        const updatedData = req.body;
        try {
            console.log('היייי תורת השם תמימה!!!!!!!!!!!!');
            const result = await this.service.update(updatedData);
            if (result.affectedRows > 0) {
                res.status(200).send(`updated successfully`);
            } else {
                res.status(404).send(`not found`);
            }
        } catch (error) {
            res.status(500).send('Server Error');
        }
    }
    async delete(req, res, next) {
        const id = req.params.id;
        try {
            console.log(id);
            const result = await this.service.delete(id);
            console.log(result);
            if (result.affectedRows > 0) {
                res.status(200).send(`deleted successfully`);
            } else {
                res.status(404).send(`not found`);
            }
        } catch (error) {
            res.status(500).send('Server Error');
        }
    }
}

module.exports = Controller;