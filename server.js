const express = require('express');
const hbs = require('hbs'); 
const fs = require('fs');
var app = express();


hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n');
    next();

});


app.get('/',(req,res)=>{
   res.render('home.hbs',{
    pageTitle: 'Homepage',
    welcomeMessage : 'hey guys welcome!'

   });
   
});


app.get('/about',(req,res)=>{

    res.render('about.hbs',{
        pageTitle: 'aboutpage',
    
    });
});

app.get('/bad',(req,res)=>{

    res.send({
        errormessage :'unable to handle the request'
    });
});
app.listen(3000,()=>{
    console.log('server is on port 3000')
});