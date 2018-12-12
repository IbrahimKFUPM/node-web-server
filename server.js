const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine','hbs');
// app.get('/',(req,res) => {
//   // res.send('<h1>Hello Express<h1>');
//   res.send({
//     name: 'Ibrahim',
//     age:'23',
//     plays:['God of War', 'Red Dead Redemption 2']
//   })
// });

hbs.registerPartials(__dirname+'/views/partials');

app.use((req,res,next) => {
  var timeStamp = new Date().toString();
  var log = timeStamp+': '+req.method+' ' + req.url;
  fs.appendFile('server.log',log+'\n',(error) => {
    if(error){
      console.log('Unable to connect to server.log');
    }
  });
  next();
})

// app.use((req,res,next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {
  res.render('home.hbs', {
    pageTitle:'Home page',
    welcomeMessage:'Hello and welcome to my website',
  })
})

app.get('/projects',(req,res) => {
  res.render('projects.hbs', {
    pageTitle:'Portfolios'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs', {
    pageTitle:'About page',
  });
});

app.get('/bad',(req,res) => {
  res.send({
    statusCode:'404',
    errorMessage:'Bad request. Such page does not exist'
  })
})

app.listen(port,console.log('Server is up on port ' + port));
