const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('np')
    .setDescription('Gets the current song'),
  async execute(interaction, player) {
    let response = '';
    try {
      response = player.getQueue(interaction.guild).current.toString();
    } catch (error) {
      response = 'Nothing playing';
    }
    await interaction.reply(response);
  },
};
