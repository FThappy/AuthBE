import { MailtrapClient } from "mailtrap"

import dotenv from "dotenv";

dotenv.config();

export const mailClientConfig = new MailtrapClient({ endpoint: process.env.MAIL_END_POINT, token: process.env.MAIL_TOKEN });

export const mailSender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
// const recipients = [
//   {
//     email: "volunteerapp914@gmail.com",
//   }
// ];
// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);