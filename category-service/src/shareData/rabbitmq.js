import amqplib from 'amqplib';


export const  sendUserData = async(userData) => {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    const queue = 'user_to_product_queue';

    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(userData)));
    console.log('Message sent:', userData);

    setTimeout(() => { conn.close(); }, 500);
}

