const rrSchema = require("../../Models/ReactionRoles");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("removerole")
        .setDescription("Rolü kaldırır.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("Rol kaldırıldı")
                .setRequired(true)
        ),
    async execute(interaction) {
        const { options, guildId, member } = interaction;

        const role = options.getRole("role");

        try {

            const data = await rrSchema.findOne({ GuildID: guildId });

            if (!data)
                return interaction.reply({ content: "Bu sunucuda herhangi bir veri yok.", ephemeral: true });

            const roles = data.roles;
            const findRole = roles.find((r) => r.roleId === role.id);

            if (!findRole)
                return interaction.reply({ content: "Bu rol mevcut değil.", ephemeral: true });

            const filteredRoles = roles.filter((r) => r.roleId !== role.id);
            data.roles = filteredRoles;

            await data.save();

            return interaction.reply({ content: `Rol silindi.**${role.name}**` });

        } catch (err) {
            console.log(err);
        }
    }
}