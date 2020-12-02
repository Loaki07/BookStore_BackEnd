import nodemailer from 'nodemailer';

class SendEMail {
  createTransporter = () => {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  };

  sendMailNotification = async (options) => {
    const transporter = this.createTransporter();
    // send mail with defined transport object
    const message = {
      from: `${process.env.FROM_NAME} ${process.env.FROM_EMAIL}`,
      to: options.emailId,
      subject: options.subject,
      html: options.message,
    };
    const info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
  };
}
export default SendEMail;
