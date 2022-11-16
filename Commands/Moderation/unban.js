const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Bir kullanıcının discord sunucusundaki yasağını kaldırın.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName("userid")
                .setDescription("Yasağını kaldırmak istediğiniz kullanıcının Discord Kimliği.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const userId = options.getString("userid");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setDescription(`Başarıyla ${userId} kullanıcısının banı kaldırıldı.`)
                .setColor(0x5fb041)
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
            });
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`Lütfen geçerli bir üye kimliği girin.`)
                .setColor(0xc72c3b);

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
}