import Joi from 'joi';

class Validation {
  /**
   * @description Validation using Joi for User schema
   * @param {Object} user
   */
  validateUserRegistration = (user) => {
    const validateObject = Joi.object({
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      emailId: Joi.string().email().lowercase().required(),
      password: Joi.string().min(6).required(),
    });

    return validateObject.validateAsync(user);
  };
}

export default Validation;
