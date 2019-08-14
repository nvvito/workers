//basic controller
function BasicController(_model) {
    //private field
    const model = _model
    //public field

    //private method

    //public method
    this.getAll = async (request, response) => {
        let result = await model.getAll()
        if (!result.error) {
            return response.send(result)
        } else return response.status(500).send(result)
    }
    this.getOneById = async (request, response) => {
        //params
        let id = request.params.id
        //call method
        let result = await model.getOneById(id)
        if (!result.error) {
            return response.send(result)
        } else return response.status(500).send(result)
    }
    this.createOne = async (request, response) => {
        //params
        let data = request.body
        //call method
        let result = await model.createOne(data)
        if (!result.error) {
            return response.send({
                insertedId: result.insertedId.toString(),
                insertedCount: result.insertedCount,
                ops: result.ops
            })
        } else return response.status(500).send(result)
    }
    this.updateOneById = async (request, response) => {
        //params
        let id = request.params.id
        let data = request.body
        //call method
        let result = await model.updateOneById(id, data)
        if (!result.error) {
            return response.send(result)
        } else return response.status(500).send(result)
    }
    this.deleteOneById = async (request, response) => {
        //params
        let id = request.params.id
        //call method
        let result = await model.deleteOneById(id)
        if (!result.error) {
            return response.send(result)
        } else return response.status(500).send(result)
    }
}
//export
module.exports = BasicController