const nodemailer = require("nodemailer");

const sendingOut = async (email, link) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: process.env.MAILPORT,
      secure: true,
      auth: {
        user: process.env.GMAILACC,
        pass: process.env.GMAILPW,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAILACC,
      to: email,
      subject: "Please reset your password by clicking below link ",
      text: link,
    });

    console.log("email sent success");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendingOut;
