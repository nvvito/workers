const model = require('../models/department')
const BasicController = require('./basic')

//controller
function DepartmentController(_model)  {
    //inheritance
    BasicController.call(this, _model)
    //private field
    const model = _model
    //custom method
}

//export
module.exports = new DepartmentController(model)