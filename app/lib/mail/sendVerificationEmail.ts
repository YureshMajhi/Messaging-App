import nodemailer from "nodemailer";

export async function sendOtpEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    from: "noreply@yourapp.com",
    subject: "Your verification code for messaging app",
    text: `Your verification code is ${otp}`,
  });
}
