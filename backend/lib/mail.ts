/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 0,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text: string): string => `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2,
      font-size: 20px;
    ">
      <h2>Hello There</h2>
      <p>${text}</p>
      <p>Thank you</p>
    </div>
  `;

export interface Envelope {
  from: string;
  to?: string[] | null;
}
export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export const sendPasswordResetEmail = async (
  resetToken: string,
  to: string
): Promise<void> => {
  const info = (await transport.sendMail({
    to,
    from: 'oshalusijohn@gmail.com',
    subject: 'Your password reset token',
    html: makeANiceEmail(`Your password reset token is here!
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
    `),
  })) as MailResponse;

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log('Message Sent!');
    // console.log(`Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
};
