"use server";

const nodemailer = require("nodemailer");

export default async function subscribe(formData) {
  const email = formData.get("email");
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter
    .sendMail({
      to: "internal.chat.itp@gmail.com",
      subject: `New subscriber: ${email}`,
      text: `New subscriber: ${email}`,
    })
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });
}
