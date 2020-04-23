const mongoose = require('mongoose');

const answerSchema = require(process.cwd() + '/modules/db/Answer.js').answerSchema;

const formSchema = mongoose.Schema({
  questions: {
    type: [answerSchema]
  }
});

const Form = mongoose.model('Form', formSchema);

const createForm = (questions) => {
  return new Form({questions});
}

module.exports.formSchema = formSchema;
module.exports.Form = Form;
module.exports.createForm = createForm;
