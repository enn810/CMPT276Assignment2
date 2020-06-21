const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const { Recoverable } = require('repl');
var pool;
pool = new Pool({
  connectionString: 'postgres://postgres:root@localhost:5432/people'
})

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));
app.get('/database', (req, res) => {
  // var getUsersQuery = 'SELECT * FROM person;';
  // pool.query(getUsersQuery, (error,result) => {
  //   if (error) {
  //     res.end("Query is NULL");
  //   }
  //   var results = {'rows':result.rows};
  //   res.render('pages/db', results);
  res.render('pages/Assignment2');
//})
});

app.post("/input", function(req, res) {
  req.body.
  var submitName = req.body.inputName;
  var submitSize
  var submitHeight
  var submitType
  var submitYear
  var submitPower
  var submitHair
  var dataInsert = "INSERT INTO Person (name, size, height, type, year, superpower, hair) values ($1, $2, $3, $4, $5, $6, $7);
  pool.query(dataInsert, [name, size, height, type, year, superpower, hair], (error,result) => {
    if(error) {
      res.end(error);
    }
    console.log(result);
  })
});

app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));