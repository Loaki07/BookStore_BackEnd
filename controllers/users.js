import validation from '../middleware/validation.js';
import UserService from '../services/userService.js';
import logger from '../config/logger.js';
import { getSignedJwtToken, verifyEmailToken } from '../utility/tokens.js';
const { registerNewUser, logInByUserName, updateUserInDb } = new UserService();
const { validateUserRegistration, validateUserLogIn } = new validation();

class UserController {
  /**
   * @description Register User
   * @route POST /registration
   * @param {object} req
   * @param {object} res
   */
  registerUser = async (req, res) => {
    const responseData = {};
    try {
      const userDataObject = {
        fullName: req.body.fullName,
        emailId: req.body.emailId,
        password: req.body.password,
        mobileNumber: req.body.mobileNumber,
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
      // console.log(error.stack);
      res.status(500).send(responseData);
    }
  };

  /**
   * @description LogIn User
   * @route POST /login
   * @param {object} req
   * @param {object} res
   */
  logInUser = async (req, res) => {
    const responseData = {};
    try {
      const loginUserObject = {
        emailId: req.body.emailId,
        password: req.body.password,
      };
      const { error } = await validateUserLogIn(loginUserObject);
      if (error) {
        throw new Error(error);
      }
      this.#validateUserLogIn(loginUserObject);
      const result = await logInByUserName(loginUserObject);
      responseData.success = true;
      responseData.message = 'Successfully Logged In!';
      logger.info(responseData.message);
      this.#sendTokenResponse(result, 200, res, responseData);
    } catch (error) {
      responseData.success = false;
      responseData.message = error.message;
      logger.error(error.message);
      // console.log(error.stack);
      res.status(500).send(responseData);
    }
  };

  /**
   * @description Verifing the email using JWT and email verification is confirmed
   * @route GET /fundooapp/verify-email/:token
   * @param {object} req
   * @param {object} res
   */
  emailVerification = async (req, res) => {
    const responseData = {};
    try {
      const result = verifyEmailToken(req.params.token);
      updateUserInDb(result.emailId, {
        isEmailVerified: true,
      });
      logger.info('User EmailId is Verified');
      responseData.success = true;
      responseData.message = 'Successfully Verified Email!';
      logger.info(responseData.message);
      res.status(200).send(responseData);
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
