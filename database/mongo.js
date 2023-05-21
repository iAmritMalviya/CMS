const db = module.exports

const {MongoClient} = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017')
const collectionName = 'cms'
const database = 'mongo'

db.collection = async () => {

    const db = (await client.connect()).db(database)
    const collection =  await db.collection(collectionName)
    return collection
}