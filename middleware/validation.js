import Joi from 'joi';

class Validation {
  /**
   * @description Validation using Joi for User schema
   * @param {Object} user
   */
  validateUserRegistration = (user) => {
    const validateObject = Joi.object({
      fullName: Joi.string().min(3).required(),
      emailId: Joi.string().email().lowercase().required(),
      password: Joi.string().min(6).required(),
      mobileNumber: Joi.number().required(),
    });

    return validateObject.validateAsync(user);
  };

  validateUserLogIn = (user) => {
    const validateObject = Joi.object({
      emailId: Joi.string().email().lowercase().required(),
      password: Joi.string().min(6).required(),
    });
    return validateObject.validateAsync(user);
  };

  validateBook = (book) => {
    const validateObject = Joi.object({
      author: Joi.string(),
      title: Joi.string().required(),
      image: Joi.string(),
      quantity: Joi.number(),
      price: Joi.number(),
      description: Joi.string(),
    });
    return validateObject.validateAsync(book);
  };
}

export default Validation;
