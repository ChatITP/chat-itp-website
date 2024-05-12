import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function sendEmail(text) {
  transporter
    .sendMail({
      to: "internal.chat.itp@gmail.com",
      subject: `New subscriber: ${text}`,
      text: `New subscriber: ${text}`,
    })
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });
}
