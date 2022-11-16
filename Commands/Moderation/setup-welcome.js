const {Message, Client, SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");
const welcomeSchema = require("../../Models/Welcome");
const {model, Schema} = require("mongoose");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup-welcome")
    .setDescription("Sunucuya yeni gelenler için mesajlarınızı ayarlayın.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option => 
        option.setName("channel")
        .setDescription("Karşılama mesajları için kanal.")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("welcome-message")
        .setDescription("Karşılama mesajınızı girin.")
        .setRequired(true)
    )
    .addRoleOption(option =>
        option.setName("welcome-role")
        .setDescription("Karşılama rolünüzü girin.")
        .setRequired(true)    
    ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const welcomeChannel = options.getChannel("channel");
        const welcomeMessage = options.getString("welcome-message");
        const roleId = options.getRole("welcome-role");

        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
            interaction.reply({content: "Bunun için izinlerim yok.", ephemeral: true});
        }

        welcomeSchema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if(!data) {
                const newWelcome = await welcomeSchema.create({
                    Guild: interaction.guild.id,
                    Channel: welcomeChannel.id,
                    Msg: welcomeMessage,
                    Role: roleId.id
                });
            }
            interaction.reply({content: 'Bir karşılama mesajı başarıyla oluşturuldu', ephemeral: true});
        })
    }
}