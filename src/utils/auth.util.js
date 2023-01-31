const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const crypto = require('crypto');

function hashToken(token) {
  return crypto.createHash('sha512').update(token).digest('hex');
};

const generateAccessToken = (payload) => {
  const issuer = process.env.JWT_ISSUER || "";
  const subject = process.env.JWT_SUBJECT || "";
  return jwt.sign({userId: payload._id, role: payload.role, email: payload.email, firstname: payload.firstName},
    process.env.JWT_SECRET || "fallbackjwtsecret", {
    expiresIn: '8h',
    issuer,
    subject,
  });
};

const generateRefreshToken = (payload, jti) => {
  const issuer = process.env.JWT_ISSUER || "";
  const subject = process.env.JWT_SUBJECT || "";
  return jwt.sign({userId: payload._id, role: payload.role, email: payload.email, firstname: payload.firstName, jti},
    process.env.JWT_REFRESH_SECRET || "fallbackjwtrefreshsecret", {
    expiresIn: '8h',
    issuer,
    subject,
  });
};

const generateTokens = (payload, jti) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload, jti);
  return {
    accessToken,
    refreshToken,
  };
};

// host: 'smtp.office365.com',
// secure: false,
// port: '587',
// tls: {
// ciphers: "SSLv3",
// rejectUnauthorized: false,
// },
// auth: {
// user: mailSenderAccount.user,
// pass: mailSenderAccount.pass,
// },
// debug: true,
// logger:true,


const sendEmail = async (email, subject, text) => {
  try {
      const transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          secure: false,
          port: 587,
          tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
          },
      });

      await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: subject,
          html: text,
      });

      console.log("email sent sucessfully");
  } catch (error) {
      console.log(error, "email not sent");
  }
};

const generateVerifyEmailText = async (token, userId) => {
  return `<div
    style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-size: 13px; width: 30vw; border: 1px  solid rgba(112, 112, 112, 0.436); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem 2rem; border-radius: 10px; background: white;">
    <p style="width: 90%; letter-spacing: 0.12rem;">
      You are recieving this email because you signed up to Henning and are
      required to verify your email address. Please click on the link below to
      complete the signup process:
    </p>
    <a style="margin: 1rem 0; padding: 1rem 2rem; text-decoration: none; letter-spacing: 0.2rem; text-align:center; color: white; background: rgb(16, 160, 16); border-radius: 10px; "
      href="${process.env.CLIENT_URL}/verify-email?token=${token}&userId=${userId}" target="_blank">
      Verify
    </a>
  </div>`
};

const generateResetPasswordEmailText = async (token) => {
  return `<div
    style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-size: 13px; width: 30vw; border: 1px  solid rgba(112, 112, 112, 0.436); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem 2rem; border-radius: 10px; background: white;">
    <p style="width: 90%; letter-spacing: 0.12rem;">
      You are recieving this email because you have requested to reset your password for your Henning project account.
      Please click on the link below to complete the reset password process:
    </p>
    <a style="margin: 1rem 0; padding: 1rem 2rem; text-decoration: none; letter-spacing: 0.2rem; text-align:center; color: white; background: rgb(16, 160, 16); border-radius: 10px; "
      href="${process.env.CLIENT_URL}/reset-password?${token}" target="_blank">
      Reset Password
    </a>
    <p style="width: 90%; letter-spacing: 0.12rem;">
    If you did not request this, please ignore this email and your password will remain unchanged.
    </p>
  </div>`
};

const generatePasswordEmailText = async (email, password, token, userId) => {
  return `<div
  style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-size: 13px; width: 30vw; border: 1px  solid rgba(112, 112, 112, 0.436); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem 2rem; border-radius: 10px; background: white;">
  <p style="width: 90%; letter-spacing: 0.12rem;">
    You are recieving this email because you have been added to Henning. These are your log in credentials:<br>
     email: ${email}
     password: ${password} <br>
      You can change your password after you log in. Click on the link below to verify your email.
  </p>
  <a style="margin: 1rem 0; padding: 1rem 2rem; text-decoration: none; letter-spacing: 0.2rem; text-align:center; color: white; background: rgb(16, 160, 16); border-radius: 10px; "
    href="${process.env.CLIENT_URL}/verify-email?token=${token}&userId=${userId}" target="_blank">
    Verify
  </a>
</div>`
};

module.exports = { 
  generateTokens,
  generateAccessToken,
  generateRefreshToken,
  sendEmail,
  hashToken,
  generateVerifyEmailText,
  generateResetPasswordEmailText,
  generatePasswordEmailText
 };
