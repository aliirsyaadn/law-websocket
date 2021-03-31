var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    var queue = 'task_queue';

    channel.assertQueue(queue, {
      durable: true,
    });
    channel.prefetch(1);
    console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);
    channel.consume(
      queue,
      (msg) => {
        var secs = msg.content.toString().split('.').length - 1;

        console.log(` Task : ${msg.content.toString()}`);
        setTimeout(() => {
          console.log('Task Completed');
          channel.ack(msg);
        }, secs * 1000);
      },
      {
        noAck: false,
      }
    );
  });
});
