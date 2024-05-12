"use server";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function subscribe(formData) {
  const email = formData.get("email");

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
