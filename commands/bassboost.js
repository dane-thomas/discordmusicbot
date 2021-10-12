const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bassboost')
    .setDescription('Enable bassboost filter'),
  async execute(interaction, player) {
    let response = '';
    try {
      await interaction.deferReply();
      const queue = player.getQueue(interaction.guild);
      await queue.setFilters({
        bassboost: !queue.getFiltersEnabled().includes('bassboost'),
        earrape: !queue.getFiltersEnabled().includes('earrape'),
        normalizer2: !queue.getFiltersEnabled().includes('bassboost'),
      });
      // response = `The queue's now as boosted as you :^)`;
      interaction.followUp({
        content: `🎵 | Bassboost ${
          queue.getFiltersEnabled().includes('bassboost')
            ? 'Enabled'
            : 'Disabled'
        }!`,
      });
    } catch (error) {
      interaction.followUp({ content: '❌ | No music is being played!' });
    }
  },
};
