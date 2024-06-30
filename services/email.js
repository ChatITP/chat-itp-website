import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function sendEmail(email) {
  await transporter.sendMail({
    // to:"jl13999@nyu.edu",
    to: "internal.chat.itp@gmail.com",
    subject: `New subscriber: ${email}`,
    text: `New subscriber: ${email}`,
  });
}
