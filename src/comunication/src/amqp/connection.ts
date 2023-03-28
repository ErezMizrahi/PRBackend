import amqplib, { Channel, Connection } from 'amqplib'

class Amqp { 

  constructor(private channel?: Channel, private connection?: Connection) {
   this.connect();
 }

 private async connect() {
   try {
     const { RABBIT_MQ_URI } = process.env;
     this.connection = await amqplib.connect(RABBIT_MQ_URI);
     this.channel = await this.connection.createChannel();

   } catch (err) {
     console.error(err);
   }
 }
 
  async consumeMessage(eventEmitter) {
    if (!this.channel) await this.connect();

    await this.channel.assertExchange('authExchanges', 'fanout', {durable: false})
    
    const queue = await this.channel.assertQueue('authQueue',  { autoDelete: false })

    this.channel.prefetch(1);

    await this.channel.bindQueue(queue.queue, "authExchanges", "auth");

    await this.channel.consume(queue.queue, message => {
      const msg = JSON.parse(message.content.toString());
      eventEmitter.emit('user-signed-up', msg.message);
      this.channel.ack(message);
    })
  }
}

export default new Amqp();