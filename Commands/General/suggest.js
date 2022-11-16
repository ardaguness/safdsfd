const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggest")
        .setDescription("Bir şey öner.")
        .addStringOption(option =>
            option.setName("name")
                .setDescription("önerinizi adlandırın.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Önerinizi açıklayın.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { guild, options, member } = interaction;

        const name = options.getString("name");
        const description = options.getString("description");

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`tarafından yapılan bir öneri ${member}`)
            .addFields(
                { name: "Öneri", value: `${name}` },
                { name: "Açıklama", value: `${description}` },
            )
            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) });

        await guild.channels.cache.get('1028762124014600193').send({
            embeds: ([embed]),
        }).then((s) => {
            s.react('✅');
            s.react('❌');
        }).catch((err) => {
            throw err;
        });

        interaction.reply({ content: ":white_check_mark: | Öneriniz başarıyla iletildi.", ephemeral: true });
    }
}