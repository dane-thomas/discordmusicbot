const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('np')
    .setDescription('Gets the current song'),
  async execute(interaction, player) {
    let response = '';
    try {
      const queue = player.getQueue(interaction.guild);
      response = queue.current.toString() + '\n' + queue.createProgressBar();
    } catch (error) {
      response = '❌ | Nothing playing!';
    }
    await interaction.reply(response);
  },
};
