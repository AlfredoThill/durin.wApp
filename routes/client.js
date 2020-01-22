const MongoClient = require('mongodb').MongoClient;

//. Client Funcion, to call and close on each query, esto es malo o bueno? asumo que malo
let client = function(user,pwd) {
    let uri = 'mongodb://'+user+':'+pwd+'@localhost:27017?authMechanism=DEFAULT&authSource=test'; 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(function (error){
        if (error)
            console.log(error);
        else
            console.log('Se inicio conexion');
    });
    return client
}

module.exports = client;

// //. Static Client, can't figure out how to auth after connection, la concha de mi viejo
// // const uri = 'mongodb://readUser:relevdatos20@localhost:27017?authMechanism=DEFAULT&authSource=test';
// const uri = "mongodb://localhost";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(function (error){
//     if (error) {
//         console.log('Problemas de conexion con mongo');
//     }    
//     else { console.log('Se inicio conexion'); }
// });