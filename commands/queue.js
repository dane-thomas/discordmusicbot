const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Replies with the queue'),
  async execute(interaction, player) {
    let response = '';
    try {
      response = player.getQueue(interaction.guild).toString();
    } catch (error) {
      response = '❌ | Nothing playing... Use `/play` to add a song';
    }
    await interaction.reply(response);
  },
};
