const mongoose = require('mongoose');

let answerSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

let AnswerModel = mongoose.model('Answer', answerSchema);

let createAnswer = (question, answer) => {
  return new AnswerModel({question, answer});
}

module.exports.createAnswer = createAnswer;
module.exports.AnswerModel = AnswerModel;
module.exports.answerSchema = answerSchema;
