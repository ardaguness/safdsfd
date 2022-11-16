const rrSchema = require("../../Models/ReactionRoles");
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("panel")
        .setDescription(" Rol paneli")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const { options, guildId, guild, channel } = interaction;

        try {
            const data = await rrSchema.findOne({ GuildID: guildId });

            if (!data.roles.length > 0)
                return interaction.reply({ content: "Bu sunucuda herhangi bir veri yok.", ephemeral: true });

            const panelEmbed = new EmbedBuilder()
                .setDescription("Lütfen aşağıdan bir rol seçin")
                .setColor("Aqua")

            const options = data.roles.map(x => {
                const role = guild.roles.cache.get(x.roleId);

                return {
                    label: role.name,
                    value: role.id,
                    description: x.roleDescription,
                    emoji: x.roleEmoji || undefined
                };
            });

            const menuComponents = [
                new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('reaction-roles')
                        .setMaxValues(options.length)
                        .addOptions(options),
                ),
            ];

            channel.send({ embeds: [panelEmbed], components: menuComponents });

            return interaction.reply({ content: "Paneliniz başarıyla gönderildi.", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}