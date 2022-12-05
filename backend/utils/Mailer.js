// Import Node-Mailer For Send Confirmation Link To User Mail
const nodeMailer = require("nodemailer");

const sendConfirmationEmail = (
  emailType,
  userEmail,
  userName,
  userEmailToken
) => {
  return new Promise((resolve, reject) => {
    // Generate Mail Configuration
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailerLinkHost =
      process.env.NODE_ENV === "production"
        ? "https://family-budget.herokuapp.com"
        : process.env.NODE_ENV === "development"
        ? `http://${process.env.DOMAIN}`
        : "http://127.0.0.1:5000";

    // Send Verification Mail Content Creator
    const mailOptions = {
      from: '"Verify Your Mail" <developer.vicky@gmail.com>',
      to: userEmail.toLowerCase(),
      subject: `Buddy-Budget - ${
        emailType === "new-user" || emailType === "email-modify"
          ? "Verify Your Email"
          : "Resent Verification Link"
      } `,
      html: `<h2>Dear ${userName},</h2>
          ${
            emailType === "new-user"
              ? "<h3>Thanks for registering on our site.</h3><h4> We're excited to have you get started. First, you need to confirm your account. Just press the link below.</h4>"
              : "<h4>Your e-mail address modified successfully. Just press the link below, to activate your account.</h4>"
          }
          <p><a href="${mailerLinkHost}/account/confirmation/success/${userEmailToken}">Click here - To activate your Email</a></p>
          <p>If you have any questions, just reply to this email—we're always happy to help out.</p>
          <P style="margin-top:30px;">Regards,</p>
          <p>Support Team</p>`,
    };

    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

module.exports = sendConfirmationEmail;
