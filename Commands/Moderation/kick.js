const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Bir kullanıcıyı discord sunucusundan atın.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("Atılacak kullanıcı.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Atılma nedeni.")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "Hiçbir sebep belirtilmedi";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Daha yüksek bir role sahip oldukları için ${user.username} üzerinde işlem yapamazsınız.`)
            .setColor(0xc72c3b)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setDescription(`Bşarıyla ${user} sunucudan atıldı. Sebep: ${reason}`);

        await interaction.reply({
            embeds: [embed],
        });
    }
}