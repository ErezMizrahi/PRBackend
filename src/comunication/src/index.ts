import dotenv from 'dotenv';
dotenv.config();

// import Amqp from './amqp/connection.js';
import EventEmitter from 'events';
import nodemailer from 'nodemailer';

console.log('comunication app started!');

const emitter = new EventEmitter();
// Amqp.consumeMessage(emitter);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "erez8821@gmail.com",
      pass: "rrfzguzmoxpvgwcn",
    },
  });



emitter.on('user-signed-up', async message => {
    console.log('user signed up ', message);
    const options = {
        from: "TESTING <sender@gmail.com>", 
        to: "erezm@webtech-inv.co.il", 
        subject: "Welcome to PR - Personal Recored", 
        text: `welcome ${message.username} to personal recored`,
        html: `<p>welcome ${message.username} to <b>personal recored</b></p>`,
    }

    try {
        const info = await transporter.sendMail(options)
        console.log('email sent successfully!!');
      } catch (error) {
        console.log(error);
      } 
})