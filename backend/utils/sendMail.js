// const google = require("googleapis").google;
const nodemailer = require("nodemailer");
const emailFormat = require("./emailFormat.js");

// These id's and secrets should come from .env file.
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLEINT_SECRET = process.env.CLEINT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
// const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLEINT_SECRET,
//   REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (email, randString, username, verifyFor) => {
  try {
    // const accessToken = await oAuth2Client.getAccessToken();
    // var transport = nodemailer.createTransport({
    //   service: "Gmail",
    //   auth: {
    //     type: 'OAuth2',
    //     user: ADMIN_EMAIL,
    //     clientId: CLIENT_ID,
    //     clientSecret: CLEINT_SECRET,
    //     refreshToken: REFRESH_TOKEN,
    //     accessToken: accessToken,
    //   }
    // })

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let htmlMail = "";
    let url = "";
    let title = "";

    if (verifyFor == "signup") {
      url = `${process.env.CLIENT_DOMAIN}/auth/verify/${username}/${randString}`;
      title = "Verify Your Account";
      htmlMail = emailFormat(username, title, url);
    } else {
      const url = `${process.env.CLIENT_DOMAIN}/auth/reset/${username}/${randString}`;
      title = "Reset Your Password";
      htmlMail = emailFormat(username, title, url);
    }
    // console.log(htmlMail);

    var mailOptions = {
      from: "| Upwork Accounts",
      to: email,
      subject: title,
      html: htmlMail,
    };
    try {
      const result = await transport.sendMail(mailOptions);
      console.log("Message Sent", result);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = sendMail;
