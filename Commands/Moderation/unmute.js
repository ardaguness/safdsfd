const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Sunucudan bir üyenin sesini açma")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("Susturmasını açmak istediğiniz kullanıcıyı seçin.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser("target");
        const member = guild.members.cache.get(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription('Bir şeyler ters gitti lütfen daha sonra tekrar deneyin.')
            .setColor(0xc72c3b)

        const succesEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Unmuted**")
            .setDescription(`Başarıyla ${user} kullanıcısının susturması açıldı.`)
            .setColor(0x5fb041)
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true }); // this if statement is optional (but recommended)

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        try {
            await member.timeout(null);

            interaction.reply({ embeds: [succesEmbed], ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}