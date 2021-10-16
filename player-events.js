module.exports.registerPlayerEvents = (player) => {
  player.on('error', (queue, error) => {
    console.log(
      `[${queue.guild.name}] Error emitted from the queue: ${error.message}`
    );
  });
  player.on('connectionError', (queue, error) => {
    console.log(
      `[${queue.guild.name}] Error emitted from the connection: ${error.message}`
    );
  });

  player.on('trackStart', (queue, track) => {
    console.log('track start', track.title);
    queue.metadata.channel.send(
      `🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`
    );
  });

  player.on('trackAdd', (queue, track) => {
    console.log('added track', track.title);
    // queue.metadata.channel.send(`🎶 | Track **${track.title}** queued!`);
  });

  player.on('botDisconnect', (queue) => {
    console.log('disconnect', queue);
  });

  player.on('channelEmpty', (queue) => {
    console.log('channel empty');
    queue.metadata.channel.send(
      '❌ | Nobody is in the voice channel, leaving...'
    );
  });

  player.on('queueEnd', (queue) => {
    console.log('queue end');
    // queue.metadata.send('✅ | Queue finished!');
  });
};
