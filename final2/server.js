const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
var db;

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

  app.post('/comments', (req, res) => {
    console.log(req.body);
    let { comments } = req.body;

    db.collection('comments').findOne({ comments }, (err, result) => {
        if (err) {
            console.log(err)
            res.json({
                message: err,
                status: false
            })
        } else {
            console.log(result)
            if (!empty(result)) {
                bcrypt.compare(comments, result.comments, function (err,result) {

                    console.log("comments match : ")
                    if (result === true) {
                        res.redirect('/index');

                    } else {
                        console.log("*Password is invalid")
                        res.redirect('/')                    }
                });
            } 
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
