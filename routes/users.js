const MongoClient = require('mongodb').MongoClient;
const admin = require('./admin');

//. Find the user in the server's db
let checkUser = async function (user) {
  try {
    let id = 'test.'+user;
    let cursor = await admin.db('admin').collection('system.users').findOne({_id: id});
    if (cursor === null) { return false }
    else { return true}
  }
  catch (e) {
    console.log(e) ; return e
  }  
}

//. Test the connection, dont really know how... Trying with: input credentials and wait for error, alta garcha(?)
let testConnection = async function (user,pwd) {
  try {
    let uri = 'mongodb://'+user+':'+pwd+'@localhost:27017?authMechanism=DEFAULT&authSource=test'; 
    const client = new MongoClient(uri, { connectTimeoutMS: 1000 }); //Si en 1 seg no se conecto y autentifico lo reboto
    await client.connect();
    client.close();
    return true
  }
  catch (e) {
    console.log(e) ; return false
  }   
}

module.exports = {
  checkUser,
  testConnection
}