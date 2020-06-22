const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const { Recoverable } = require('repl');
var pool;
pool = new Pool({
  //connectionString: 'postgres://postgres:root@localhost:5432/people'
  connectionString: process.env.DATABASE_URL
})

var app = express()
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/database', (req, res) => {
  res.render('pages/Assignment2');
})

app.post('/input', function (req, res) {
  console.log(req.body)
  var submitName = req.body.inputName;
  var submitSize = req.body.inputSize;
  var submitHeight = req.body.inputHeight;
  var submitType = req.body.inputType;
  var submitYear = req.body.inputYear;
  var submitPower = req.body.inputPower;
  var submitHair = req.body.inputHair;

  var dataInsert = 'INSERT INTO Person (name, size, height, type, year, superpower, hair) values ($1, $2, $3, $4, $5, $6, $7)';
  pool.query(dataInsert, [submitName, submitSize, submitHeight, submitType, submitYear, submitPower, submitHair], (error, result) => {
    if (error) {
      res.end(error);
    };
  });
  res.redirect('/view');
});

app.post("/delete", function (req,res) {
  var deleteFunction = req.body.deleteSelection;
  pool.query('DELETE FROM Person WHERE id = $1', [deleteFunction], (error, result) => {
    if (error) {
      res.send(error);
    };
    res.redirect('view')
  });
});


app.post("/change" , function (req,res) {
  var changeNameSubmit = req.body.changeName;
  var changeSizeSubmit = req.body.changeSize;
  var changeHeightSubmit = req.body.changeHeight;
  var changeTypeSubmit = req.body.changeType;
  var changeYearSubmit = req.body.changeYear;
  var changePowerSubmit = req.body.changePower;
  var changeHairSubmit = req.body.changeHair;

  var selectedPerson = req.body.changeSelection;
  pool.query('UPDATE Person Set name = $1, size = $2, height = $3, type = $4, year = $5, superpower = $6, hair = $7 where ID = $8', [changeNameSubmit, changeSizeSubmit, changeHeightSubmit, changeTypeSubmit, changeYearSubmit, changePowerSubmit, changeHairSubmit, selectedPerson], (error, result) => {
    if (error) {
      res.end(error);
    };
    res.redirect('/view')
  });
});

app.post("/viewDatabase", function (req,res) {
  res.redirect('view')
})

app.post("/viewMain", function (req,res) {
  res.redirect('database')
})

app.get('/table', (req, res) => {
  pool.query("SELECT * FROM Person", (error, result) => {
    if (error) {
      res.end(error);
    };
    //var submission = {"rows":result.rows};
    //console.log(submission);
    res.render('pages/table'); //submission maybe ('pages/table', submission) for table chart graph
  });
})

app.post("/viewGraph", function (req,res) {
  res.redirect('view2')
})

app.get('/view', (req, res) => {
  pool.query("SELECT * FROM Person", (error, result) => {
    if (error) {
      res.end(error);
    };
    var submission = {"rows":result.rows};
    //console.log(submission);
    res.render('pages/db', submission);
  });
})

app.get('/view2', (req, res) => {
  pool.query("SELECT * FROM Person", (error, result) => {
    if (error) {
      res.end(error);
    };
    var submission = {"rows":result.rows};
    //console.log(submission);
    res.render('pages/table', submission);
  });
})


  


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
