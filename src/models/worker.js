const BasicModel = require('./basic')
const db = require('../db')
const ObjectID = require('mongodb').ObjectID

function WorkerModel(_db, _collection, _schema) {
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
    this.getWorkersView = async page => {
        try {
            let result = await db.getCollection(collection).aggregate([
                {
                    $addFields: { department_id: { "$toObjectId": "$department" } }
                },
                {
                    $lookup: {
                        from: "department",
                        localField: "department_id",
                        foreignField: "_id",
                        as: "department_data"
                    }
                },
                {
                    $unwind: { path: "$department_data", preserveNullAndEmptyArrays: true }
                },
                {
                    $project: {
                        department_id: 0,
                        department: 0,
                    }
                },
                {
                    $addFields: { department: "$department_data" }
                },
                {
                    $project: {
                        department_data: 0,
                    }
                },
                {
                    $skip: page ? (page - 1) * 10 : 0
                },
                {
                    $limit: 10
                }
            ]).toArray()
            let count = await db.getCollection(collection).countDocuments({})
            return {
                result,
                count,
                page: page ? page : 1
            }
        } catch (err) {
            return {
                error: true,
                error_message: err,
            }
        }
    }
    this.searchData = async query => {
        try {
            let result = await db.getCollection(collection).find({ name: { $regex: query } }).limit(5).toArray()
            return result
        } catch (err) {
            return {
                error: true,
                error_message: err,
            }
        }
    }
}
//export
module.exports = new WorkerModel(db, 'worker', {
    name: null, //String,
    age: null, //Number,
    phones: [], //Array
    emails: [], //Array
    department: null //ObjectID
})