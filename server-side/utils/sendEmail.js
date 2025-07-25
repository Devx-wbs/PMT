const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text) => {
     const mailOptions = {
    from: `"TeamTrak Soft" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  };

    try {
        const info = await transporter.sendMail(mailOptions);
        if (process.env.NODE_ENV !== 'production') {
            console.log("Email sent:", info.response);
        }
        
        return info;
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Error sending email:', error);
        }
        throw error;
    }
};

module.exports = sendEmail;
