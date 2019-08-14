const model = require('../models/worker')
const BasicController = require('./basic')

//controller
function WorkerController(_model) {
    //inheritance
    BasicController.call(this, _model)
    //private field
    const model = _model
    //custom method
    this.getWorkersView = async (request, response) => {
        let page = request.body.page
        //call method
        let result = await model.getWorkersView(page)
        if (!result.error) {
            return response.send(result)
        } else return response.status(500).json({ result: result })
    }
    this.searchData = async (request, response) => {
        let query = request.body.query
        if (query) {
            let result = await model.searchData(query)
            if (!result.error) return response.send(result)
            else return response.status(500).send(result)
        } else return response.status(500).send({
            error: true,
            error_message: 'Query is empty'
        })
    }
}

//export
module.exports = new WorkerController(model)