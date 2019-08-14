const BasicModel = require('./basic')
const db = require('../db')

function DepartmentModel(_db, _collection, _schema) {
    //inheritance
    BasicModel.call(this, _db, _collection, _schema)
    //private field
    const db = _db
    const schema = _schema
    const collection = _collection
    //public field

    //custom methods
    //private method

    //public method
}
//export
module.exports = new DepartmentModel(db, 'department', {
    name: null, //String,
    city: null, //Number,
})