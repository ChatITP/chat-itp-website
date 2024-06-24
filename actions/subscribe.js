"use server";
import sendEmail from "/services/email.js"

export default async function subscribe(formData) {
  const email = formData.get("email");
  await sendEmail(email);
  return {};
}
