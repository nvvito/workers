const ObjectID = require('mongodb').ObjectID

//basic model
function BasicModel(_db, _collection, _schema) {
    //private field
    const db = _db
    const schema = _schema
    const collection = _collection
    //public field

    //private method

    //public method
    this.createEmpty = () => {
        return { ...schema }
    }
    this.updateData = (data, newData) => {
        let _data = {}
        Object.keys(data).map(key => _data[key] = newData[key] !== undefined ? newData[key] : data[key])
        return _data
    }
    this.createDocument = data => {
        return this.updateData(this.createEmpty(), data)
    }
    this.getAll = async () => {
        try {
            let result = await db.getCollection(collection).find({}).toArray()
            return result
        } catch (err) {
            return {
                error: true,
                error_message: err,
            }
        }
    }
    this.getOneById = async id => {
        if (ObjectID.isValid(id)) {
            try {
                let result = await db.getCollection(collection).findOne({ _id: ObjectID(id) })
                if (result) return result
                else return {
                    error: true,
                    error_message: 'not found ID'
                }
            } catch (err) {
                return {
                    error: true,
                    error_message: 'not found ID'
                }
            }
        } else {
            return {
                error: true,
                error_message: 'Invalid ID'
            }
        }
    }
    this.createOne = async data => {
        try {
            let result = await db.getCollection(collection).insertOne(this.createDocument(data))
            return result
        } catch (err) {
            return {
                error: true,
                error_message: err
            }
        }
    }
    this.updateOneById = async (id, data) => {
        let validData = {}
        let empty = this.createEmpty()
        Object.keys(data).map(key => {
            if (Object.keys(empty).indexOf(key) !== -1) validData[key] = data[key]
        })
        if (Object.keys(validData).length) {
            try {
                let result = await db.getCollection(collection).findOneAndUpdate({ _id: ObjectID(id) }, { $set: validData }, { returnOriginal: false })
                return result
            } catch (err) {
                return {
                    error: true,
                    error_message: err
                }
            }
        } else return {
            error: true,
            error_message: 'invalid data'
        }
    }
    this.deleteOneById = async id => {
        if (ObjectID.isValid(id)) {
            try {
                let result = await db.getCollection(collection).findOneAndDelete({ _id: ObjectID(id) })
                return result
            } catch (err) {
                return {
                    error: true,
                    error_message: 'not found ID'
                }
            }
        } else {
            return {
                error: true,
                error_message: 'Invalid ID'
            }
        }
    }
}

//export
module.exports = BasicModel