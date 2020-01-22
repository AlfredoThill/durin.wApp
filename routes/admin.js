const MongoClient = require('mongodb').MongoClient;
const express = require('express');

//.En esta variable estoy declarando mis credenciales de administrador, muy posiblemente sea una gran falla de seguridad...
const uri = 'mongodb://useradmin:relevdatos20@localhost:27017?authMechanism=DEFAULT&authSource=admin';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // Aqui viene lo bueno jovenes!
const client = new MongoClient(uri, { useNewUrlParser: true }); // No uso "useUnifiedTopology: true" para poder user "client.isconnect()" en 'operaciones'
// const test = new MongoClient(uri,{ connectTimeoutMS: 1000 });

client.connect(function (error){
    if (error) {
        console.log(error);
    }    
    else { 
        console.log('Administrador activo.'); 
    }
}); 

module.exports = client;