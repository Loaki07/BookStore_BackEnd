import { User } from '../models/user.js';
import validation from '../middleware/validation.js';
import UserService from '../services/userService.js';
import logger from '../config/logger.js';
import { getSignedJwtToken } from '../utility/tokens.js';
const { registerNewUser } = new UserService();
const { validateUserRegistration } = new validation();

class UserController {
  /**
   * @description Register User
   * @route POST /register
   * @param {object} req
   * @param {object} res
   */
  registerUser = async (req, res) => {
    const responseData = {};
    try {
      const userDataObject = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password,
      };
      const { error } = await validateUserRegistration(userDataObject);
      if (error) {
        throw new Error(error);
      }
      const result = await registerNewUser(userDataObject);
      responseData.success = true;
      responseData.message = 'Successfully Registered User!';
      logger.info(responseData.message);
      this.#sendTokenResponse(result, 200, res, responseData);
    } catch (error) {
      responseData.success = false;
      responseData.message = error.message;
      logger.error(error.message);
      console.log(error.stack);
      res.status(500).send(responseData);
    }
  };

  /**
   * @description Validating User Input for log In
   * @param {object} data
   */
  #validateUserLogIn = (data) => {
    const { emailId, password } = data;
    if (!emailId && !password) {
      throw new Error('Please provide an email and password!');
    } else if (!password) {
      throw new Error('Password cannot be empty!');
    } else if (!emailId) {
      throw new Error('Email cannot be empty!');
    }
  };

  /**
   * @description Store the JWT Token in a cookie and send as response
   * @param {object} user
   * @param {object} statusCode
   * @param {object} res
   * @param {object} responseObject
   */
  #sendTokenResponse = (user, statusCode, res, responseObject) => {
    const token = getSignedJwtToken(user._id);

    const options = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE),
      httpOnly: true,
      secure: true,
    };
    responseObject.token = token;
    res.status(statusCode).cookie('token', token, options).send(responseObject);
  };
}

export default UserController;