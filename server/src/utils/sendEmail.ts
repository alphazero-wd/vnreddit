import { createTransport } from "nodemailer";

interface Email {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: Email) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "alphazero25811@gmail.com",
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "VnReddit Team <support@vnreddit.com>",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};
