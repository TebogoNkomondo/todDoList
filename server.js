const express = require('express')
const mongodb = require('mongodb')
const exphbs = require('express-handlebars')

const app = express()

// For Handlebars
app.set('views', './views')
app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout: '', // "main-layout",
  layoutsDir: '' // "views/layouts/"
}))
app.set('view engine', '.hbs')

app.use(express.static('public'))

let db
const connectionString = 'mongodb+srv://toDoAppUser:todoappuser@cluster0.fcwxa.mongodb.net/toDoApp?retryWrites=true&w=majority'
mongodb.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  db = client.db()
  if (err) {
    console.log('error accessing database')
  } else {
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
  }
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  db.collection('items').find().toArray((err, items) => {
    if (err) {
      console.log('error retrieving data')
    } else {
      res.render('index', { items: items })
    }
  })
})

app.post('/create-item', (req, res) => {
  db.collection('items').insertOne({ text: req.body.text }, (err, info) => {
    if (err) {
      console.log('error creating')
    } else {
      res.json(info.ops[0])
    }
  })
})

app.post('/update-item', (req, res) => {
  db.collection('items').findOneAndUpdate({ _id: new mongodb.ObjectID(req.body.id) }, { $set: { text: req.body.text } }, () => {
    res.send('Success')
  })
})

app.post('/delete-item', (req, res) => {
  db.collection('items').deleteOne({ _id: new mongodb.ObjectID(req.body.id) }, () => {
    res.send('Success')
  })
})
