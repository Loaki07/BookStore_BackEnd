import SendEmail from '../utility/sendEmail.js';
import RabbitMQ from '../msgQueue/rabbitMQ.js';
import logger from '../config/logger.js';
import { getSignedEmailVerificationToken } from '../utility/tokens.js';
const { sendMailNotification } = new SendEmail();
import UserService from '../services/userService.js';
import { UserModel } from '../models/user.js';
import ErrorResponse from '../utility/errorResponse.js';
const { sendToQueue, consumeFromQueue } = new RabbitMQ();
const { findOne } = new UserService();

/**
 * @description Middlareware to check if the user's email id is verified or not if not sends verification link
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const verifyEmail = async (req, res, next) => {
  const responseData = {};
  try {
    const { emailId } = req.body;
    const user = await findOne({ emailId });
    if (!user) {
      throw new ErrorResponse('Invalid Email!', 400);
    }

    if (!user.isEmailVerified) {
      let signedVerificationToken = getSignedEmailVerificationToken({
        emailId,
      });

      const verificationUrl = `${req.protocol}://${req.get(
        'host'
      )}/book-store/verify-email/${signedVerificationToken}`;

      const message = `Please click this email to confirm your email: <a href=${verificationUrl}>${verificationUrl}</a>`;

      await sendToQueue({
        emailId,
        subject: 'BookStore Email Verification',
        message,
      });
      await consumeFromQueue();
      res.send({
        success: false,
        message:
          'Email is not verified!, \nCheck your inbox to veriy it using the link sent.',
      });
      logger.error('User Email Verification is not complete!');
    } else {
      next();
    }
  } catch (error) {
    responseData.success = false;
    responseData.message = error.message;
    logger.error(error.message);
    console.log(error.stack);
    res.status(500).send(responseData);
  }
};

export { verifyEmail };
