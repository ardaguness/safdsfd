const {EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('createverify')
    .setDescription('Doğrulama kanalınızı ayarlayın')
    .addChannelOption(option =>
        option.setName('channel')
        .setDescription('Bu kanala yerleşik doğrulama gönder').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const verifyEmbed = new EmbedBuilder()
        .setTitle("Verification")
        .setDescription('Hesabınızı doğrulamak ve kanallara erişim elde etmek için düğmeye tıklayın.')
        .setColor(0x5fb041)
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify').setLabel('Verify').setStyle(ButtonStyle.Success),
                ),
            ],
        });
        if (!sendChannel) {
            return interaction.reply({content: 'Bir hata oluştu! Daha sonra tekrar deneyin.', ephemeral: true});
        } else {
            return interaction.reply({content: 'Doğrulama kanalı başarıyla ayarlandı!', ephemeral: true});
        }
    },
};