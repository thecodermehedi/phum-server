import nodemailer from 'nodemailer';
import config from '../config';
import resetEmailTemplate from '../templates/resetEmailTemplate';

const sendEmail = async (to: string, name: string, resetlink: string, exp: string) => {
  const emailTemplate = resetEmailTemplate(name, resetlink, exp);
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.nodeEnv === 'production',
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  const mailOptions = {
    from: config.smtpUser,
    to,
    subject: `Password Reset Request for ${name}`,
    html: emailTemplate,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
