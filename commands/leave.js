const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Clear the queue and leave'),
  async execute(interaction, player) {
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: 'You are not in a voice channel!',
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content: 'You are not in my voice channel!',
        ephemeral: true,
      });

    let response = '';
    try {
      player.getQueue(interaction.guild).stop();
      response = 'Smell ya later';
    } catch (error) {
      response = 'Nothing playing';
    }
    await interaction.reply(response);
  },
};
