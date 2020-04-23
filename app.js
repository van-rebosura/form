const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connection = mongoose.connect('mongodb://localhost/formDB', mongoOptions, (err) => {
  (err) ? console.log(err) : console.log('connected to db successfully');
});

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app started at port', port);
});

app.get('/', (req, res) => {
  res.render('table');
});


let createAnswer = require(process.cwd() + '/modules/db/Answer.js').createAnswer;
let createForm = require(process.cwd() + '/modules/db/Form.js').createForm;

app.post('/', (req, res) => {
  console.log('received post');
  // console.log('body', req.body);
  let obj = JSON.parse(req.body.data);
  // console.log(obj);
  let questions = new Array();
  obj.forEach((item, i) => {

    let answerObject = createAnswer(item.question, item.answer);
    questions.push(answerObject);
    // console.log(answerObject);
  });
  let form = createForm(questions);

  console.log('question loop');
  console.log(form);
  form.save((err, result) => {
    if(!err) {
      console.log('saved to db');
    }
  });


});
