const {Client} = require('discord.js');
const mongoose = require('mongoose');
const config = require("../../config.json");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });
        const activities = [
            "NoobBot > ProBot",
            "Şimdiden "+client.guilds.cache.size+" sunucuda varım",
        ]
        setInterval(()=> {
            const status = activities[Math.floor(Math.random()*activities.length)]
            client.user.setPresence({ activities: [{name: status}]});
        },5000)
        if (mongoose.connect) {
            console.log('MongoDB connection succesful.')
        }

        console.log(`${client.user.username} is now online.`);
    },
};