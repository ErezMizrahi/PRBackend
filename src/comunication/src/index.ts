import dotenv from 'dotenv';
dotenv.config();

import Amqp from './amqp/connection.js';
import EventEmitter from 'events';

console.log('comunication app started!');

const emitter = new EventEmitter();
Amqp.consumeMessage(emitter);


emitter.on('user-signed-up', message => {
    console.log('user signed up ', message);
})