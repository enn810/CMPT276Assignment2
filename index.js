const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 5000
const port = 3000
const db = require('./queries')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  get('/', (req,res) => res.render('pages/index'));
  get('/database', (req,res) => {
    var getUsersQuery = 'SELECT * FROM Person';
    pool.query(getUsersQuery, (error, result) => {
      if (error)
        res.end(error);
      var results = {'rows':result.rows}
      res.render('pages/db',results);
    })
  })
