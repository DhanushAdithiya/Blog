import nodemailer from "nodemailer";

const sendMail = function (details: object) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log("Error Occured: ", err);
    } else {
      console.log("Email Sent");
    }
  });
};

export default sendMail;
