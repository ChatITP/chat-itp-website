"use server";
import sendEmail from "@/services/email";

export default async function subscribe(formData) {
  const email = formData.get("email");
  await sendEmail(email);
}