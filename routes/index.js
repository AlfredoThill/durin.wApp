const express = require('express');
const router = express.Router();
const users = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
if (req.session.user != undefined && req.session.pwd != undefined) {
  res.render('index');  
}
else {
  res.render('guest');  
}
});

//Auth w/ session
router.get('/login', function(req, res, next) {
  if (req.session.user != undefined && req.session.pwd != undefined) {
      res.render('session',{user: req.session.user});      
  }
  else {
      res.render('login',{alert: ''});
  }
});
router.post('/login', async function(req, res, next) { 
  try {
    let user = req.body.user;
    let pwd = req.body.pwd;
    let check = await users.checkUser(user);
      if (check === false ) { 
        res.render('login',{showAlert: '<div class="alertForm" id="formWarning" style = "display: block"><span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> El usuario no existe.</div>'});
      }
      else {
        let connection = await users.testConnection(user,pwd);
        if (connection === true ) {
          req.session.user = user;
          req.session.pwd = pwd;
          res.render('session',{user: user}) 
        }
        else {
          res.render('login',{showAlert: '<div class="alertForm" id="formWarning" style = "display: block"><span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> La contraseña es inválida.</div>'}); 
        }
      }
  }
  catch (e) {console.log(e); res.render('error',{error: e})}       
});
router.get('/logout', async function(req, res, next) {
  try {
      req.session.destroy();
      res.render('guest');
  }
  catch (e) {console.log(e); res.render('error',{error: e})}    
});

module.exports = router;

// //Auth w/ cookies
// router.get('/login', function(req, res, next) {
//   if (req.cookies.userName)
//       res.render('login',{user: req.cookies.userName});
//   else
//        res.render('login');
//   });     
// router.post('/login', async function(req, res, next) {
//   try {
//     let userName = req.body.user;
//     let pwd = req.body.pwd;
//     await res.cookie('userName', userName,{ expires: new Date(Date.now() + (60*5)) });
//     res.render('mensajeoperaciones',{mensaje:'Cookie creada.'});
//     res.clearCookie('userName');
//   }
//   catch (e) {console.log(e); res.render('error',{error: e})}     
// });