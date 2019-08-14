const MongoClient = require('mongodb').MongoClient
//docker user password
let container_name = 'mongo'
//DB
function DB (db_name='workers') {
    //private field
    let db = null
    //public field

    //private method

    //public method
    this.connect = () => {
        MongoClient.connect(`mongodb://${container_name}:27017/${db_name}`, { useNewUrlParser: true }, (err, _db) => {
            if (err) {
                return console.log('problem to conect db', err)
            }
            db = _db
            console.log('Connected successfully to db server')
        })
    }
    this.getDB = () => {
        return db.db(db_name)
    }
    this.getCollection = name => {
        return this.getDB().collection(name)
    }
    
}
//export
module.exports = new DB()