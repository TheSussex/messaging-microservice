const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = 'transactions';
    const queueData = {
      type: 'updateTransactions',
      clientId: 'client-132346',
      walletAddress: '0x46F7B7774AFA0CB9C2C970E7CB43957849730176',
      transactionId: 'trans-12345677',
      currencyType: 'ethers',
    };

    channel.assertQueue(queue, {
      durable: false,
    });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(queueData)));

    console.log(' [x] Sent %s', queueData);
  });
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
