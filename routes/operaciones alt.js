const express = require('express');
const router = express.Router();
const client = require('./client');

// //Creación de la tabla
// router.get('/creartabla', function(req, res, next) {
//         console.log("Inicio la operacion...")
//         const collection = client.db('Prueba').collection("coleccionNueva");
//         collection.createCollection('coleccionNueva');
//         collection.insertOne({nombre: "Alfredo"});      
//         console.log("Se realizo la operacion.")
//         client.close(); console.log("Conexion con Mongo terminada.");
//         res.render('mensajeoperaciones',{mensaje:'La tabla se creo correctamente.'});        
// });

//Listado de registros
router.get('/listado', async function(req, res, next) {
  try {
    console.log("Inicio la operacion...")
    const collection = client.db('test').collection("estudiantes");
    const cursor = await collection.find().limit(10).toArray();
    console.log("Se realizo la operacion.")
    res.render('listado',{doc:cursor});  
  }
  catch (e) {console.log(e); res.render('error',{error: e})}     
});


//Consulta por dni
router.get('/consulta', function(req, res, next) {
  res.render('consulta');
});
router.post('/consulta', async function(req, res, next) {
    try {
        console.log("Inicio la operacion...")
        const collection = client.db('test').collection("estudiantes");
        let param = parseInt(req.body.codigo);
        const cursor = await collection.find({DNI: param}).limit(10).toArray();
        console.log("Se realizo la operacion.")
        if (cursor.length > 0) {
            res.render('listado',{doc:cursor});
        } else {
            res.render('mensajeoperaciones',{mensaje:'No existe el DNI ingresado.'});
        } 
        }
    catch (e) {console.log(e); res.render('error',{error: e})}       
});

//Consulta multiple
router.get('/consultaMultiple', function(req, res, next) {
    res.render('consultaMultiple');
  });
  router.post('/consultaMultiple', async function(req, res, next) {
      try {
          console.log("Inicio la operacion...")
          const collection = client.db('test').collection("estudiantes");
          let year = ['A',parseInt(req.body.year)]; if (isNaN(year[1])) {year[1]=''};
          let distrito = ['DIST',req.body.distrito];
          let oferta = ['PROG',req.body.oferta];
          let params = [year,distrito,oferta];
          let stm = {};
          for (p in params) { 
              let param = params[p]; 
              if (param[1] != '' && param[1]) {stm[param[0]] = param[1]} 
            }
          console.log(stm)
          const cursor = await collection.find(stm).limit(10).toArray();
          console.log("Se realizo la operacion.")
          if (cursor.length > 0) { res.render('listado',{doc: cursor}) }
          else { res.render('mensajeoperaciones',{mensaje:'Consulta Vacía'}) } 
          }
      catch (e) {console.log(e); res.render('error',{error: e})}        
  });

//Consulta contadores
router.get('/consultaContadores', function(req, res, next) {
    res.render('consultaContadores');
  });
  router.post('/consultaContadores', async function(req, res, next) {
      try {
          console.log("Inicio la operacion...")
          const collection = client.db('test').collection("estudiantes");
          let year = ['A',parseInt(req.body.year)];
          let region = ['REG',parseInt(req.body.region)];
          let params = [year,region];
          let stm = {};
          for (p in params) { let param = params[p] ; if (param[1] > 0) {stm[param[0]] = param[1]} }
          console.log(stm)
          const cursor = await collection.aggregate([{$match: stm},{$group: {_id: "$PROG", count: {$sum: 1}}}],{allowDiskUse: true}).toArray();
          console.log(cursor)
          console.log("Se realizo la operacion.")
          if (cursor.length > 0) { res.render('contadores',{doc: cursor}) }
          else { res.render('mensajeoperaciones',{mensaje:'Consulta Vacía'}) }
          } 
      catch (e) {console.log(e); res.render('error',{error: e})}           
  });

module.exports = router;