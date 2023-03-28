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
  
 
 
  async publishMessage(routingKey: string, message: any) {
    if (!this.channel) await this.connect();
    
    await this.channel.assertExchange('authExchanges', 'fanout', {durable: false})

    await this.channel.publish("authExchanges", routingKey, Buffer.from(
      JSON.stringify({
        event: 'user-signed-up',
        message: message,
        date: new Date()
      })
    ))

    console.log('message sent!')
  }
}

export default new Amqp();