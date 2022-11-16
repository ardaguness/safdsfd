const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Sunucudan bir üyeyi susturun.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("Susturmak istediğiniz kullanıcıyı seçin.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("time")
                .setDescription("Susturma zamanını seçin.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Susturma sebebini seçin.")
        ),

    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser("target");
        const member = guild.members.cache.get(user.id);
        const time = options.getString("time");
        const convertedTime = ms(time);
        const reason = options.getString("reason") || "Hiçbir sebep belirtilmedi";

        const errEmbed = new EmbedBuilder()
            .setDescription('Bir şeyler yanlış gitti. Lütfen daha sonra tekrar deneyiniz.')
            .setColor(0xc72c3b)

        const succesEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Muted**")
            .setDescription(`Başarıyla ${user} susturuldu.`)
            .addFields(
                { name: "Sebep", value: `${reason}`, inline: true },
                { name: "Süre", value: `${time}`, inline: true }
            )
            .setColor(0x5fb041)
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true }); // this if statement is optional (but recommended)

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        if (!convertedTime)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        try {
            await member.timeout(convertedTime, reason);

            interaction.reply({ embeds: [succesEmbed], ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}