const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "arpit19.kansara@gmail.com",
        pass: "pajnkcsgfatawvjq"
    },
    tls: {
        rejectUnauthorized: false 
    }
});
async function sendOTP(email, otp) {
    try {
        await transporter.sendMail({
            from: "arpit19.kansara@gmail.com",
            to: email, // user's email automatically
            subject: "OTP Verification",
            html: `<h1>Your OTP is ${otp}</h1>`
        });
        console.log("OTP sent successfully to", email);
    } catch (error) {
        console.log("Error sending OTP:", error);
    }
}

module.exports = sendOTP;