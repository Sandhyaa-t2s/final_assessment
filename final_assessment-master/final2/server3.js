var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.port || 8080;
var MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use( express.static( "public"));

// set the view engine to ejs
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    db.collection('comments').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {comments: result})
    })
  })
  
  app.post('/comments', (req, res) => {
    db.collection('comments').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
  })
app.post('/comments', function(req,res){
    console.log("comments",req.body);
    let {check} = req.body
    var temp = check;
       // console.log(loginDetails);
       db.collection('comments').findOne({"name": new RegExp('^' + temp, 'i')  },(err, result) => {
           if (err) {
               console.log(err)
           }
           console.log(result)
           if (empty(result)) {
               res.send("Please enter the value")
           } else {
                res.render('/',{data:result});
            }
       })
})

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true } ,(err, client) => {
    console.log("Connection Established");
    if (err) return console.log(err)
    db = client.db('customer-comments') // whatever your database name is
});
app.listen(port);
console.log('8080 is the magic port');





// original Server
const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
var db;
var port = process.env.port || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use( express.static( "public"));
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  db.collection('comments').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {comments: result})
  })
})

  app.post('/comments', (req, res) => {
    db.collection('comments').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
  })
//   app.post('/mycomments', function(req,res){
//     console.log("comments",req.body);
//     let {check} = req.body
//     var temp = check;
//        // console.log(loginDetails);
//        db.collection('comments').findOne({"name": new RegExp('^' + temp, 'i')  },(err, result) => {
//            if (err) {
//                console.log(err)
//            }
//            console.log(result)
//            if (empty(result)) {
//                res.send("Please enter the value")
//            } else {
//                 res.render('/',{data:result});
//             }
//        })
// })
// app.get("/comments/:id", auth, function(req, res, next) {
//   req.collection.find({
//       "data.comments": /req.params.id/i
//   }, function(e, result) {
//       if(e) return next(e);
//       res.send(result);
//   });
// });
app.post('/views', (req, res) => {
  db.collection('comments').find( { $text: { $search: "good \"bad shop\"best" } 
} )
})

//   app.get('/comments', (req, res) => {
//     console.log(req.body);
//     let { comments } = req.body;

//     db.collection('comments').findOne({ comments }, (err, result) => {
//         if (err) {
//             console.log(err)
//             res.json({
//                 message: err,
//                 status: false
//             })
//         } else {
//             console.log(result)
//             if (!empty(result)) {
//                 bcrypt.compare(comments, result.comments, function (err,result) {

//                     console.log("comments match : ")
//                     if (result === true) {
//                         res.redirect('/index');

//                     } else {
//                         console.log("*Password is invalid")
//                         res.redirect('/')                    }
//                 });
//             } 
//         }
//     })
// })
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) return console.log(err)
    db = client.db('customer-comments') 
app.listen(3000, () => {                          
    console.log('listening on 3000')
})
  })
