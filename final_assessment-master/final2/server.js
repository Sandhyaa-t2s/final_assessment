const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
var db;
var empty = require('is-empty');
var port = process.env.port || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use( express.static( "public"));
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
app.get('/check', (req, res) => {
  console.log("its working")
  let {temp}=req.body
  // var temp = req.params.check
  db.collection('comments').find({comments:{$regex:"^v"} }).toArray(function (err, result) {
      console.log("hello", result)
      if (err) {
          console.log(err)
      } else {
          if (empty(result)) {
          res.send("Please enter the value")
          } else {
            res.send(result);      }
      }
  })
})

  
  MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) return console.log(err)
    db = client.db('customer-comments') 
app.listen(3000, () => {                          
    console.log('listening on 3000')
})
  })
