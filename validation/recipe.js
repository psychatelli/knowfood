const Validator = require('validator');
const isEmpty = require('./isEmpty');


module.exports = function validateRecipeInput(data){
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 1, max: 500 })) {
    errors.text = 'Post must be between 1 and 500 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };


}