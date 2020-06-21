const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post("/input", function(req, res) {
  console.log(req.body.inputName);
});

app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));