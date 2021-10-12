const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the currently playing song'),
  async execute(interaction, player) {
    let response = '';
    try {
      player.getQueue(interaction.guild).skip();
      response = '👍 | Song skipped';
    } catch (error) {
      response = '❌ | Nothing playing!';
    }
    await interaction.reply(response);
  },
};
