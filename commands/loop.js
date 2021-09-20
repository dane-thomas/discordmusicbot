const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Loops the current queue'),
  async execute(interaction, player) {
    let response = '';
    try {
      const queue = player.getQueue(interaction.guild);
      if (queue.repeatMode === QueueRepeatMode.QUEUE) {
        queue.setRepeatMode(QueueRepeatMode.OFF);
        response = 'Canceling loop';
      } else {
        queue.setRepeatMode(QueueRepeatMode.QUEUE);
        response = 'Looping current queue';
      }
    } catch (error) {
      response = 'Nothing in the queue';
    }
    await interaction.reply(response);
  },
};
