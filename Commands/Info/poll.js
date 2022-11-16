const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Bir anket oluşturun ve belirli bir kanala gönderin")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Anketi açıklayın.")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Anketi nereye göndermek istiyorsunuz?")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel("channel");
        const description = options.getString("description");

        const embed = new EmbedBuilder()
            .setColor("Gold")
            .setDescription(description)
            .setTimestamp();

        try {
            const m = await channel.send({ embeds: [embed] });
            await m.react("✅");
            await m.react("❌");
            await interaction.reply({ content: "Anket başarıyla kanala gönderildi.", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}