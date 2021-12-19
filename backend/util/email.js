const dotenv=require("dotenv");
dotenv.config({ path: "./config.env" });

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendWelcomeEmail = (email) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'akarad@ee.iitr.ac.in', // Change to your verified sender
        subject: '👋 Welcome to AirBnb Clone',
        text: 'Hey! Welcome on board. This is a test mail.',
        html: 'Hey! Welcome onboard 🚀. This is a test mail 🧪.',
    };
    sgMail.send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    });
};


module.exports = sendWelcomeEmail;