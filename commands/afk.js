const afk = require('../afk.json')
const Discord = require('discord.js')
const fs = require('fs')

module.exports = {
	name: 'afk',
	description: 'Let\'s others know you\'re AFK and why.',
	async execute(message, args) {
        var afkImg = null
        var aMsg = "."
        if (args == "") {
            var afkMsg = null;
        } else {
            var afkMsg = args.join(" ");
            aMsg = ": " + afkMsg
        }
        if (message.attachments.array().length !== 0) {
            afkImg = message.attachments.array()[0].proxyURL
        }
        const afkEmbed = new Discord.MessageEmbed()
            .setTitle(" ")
            .setColor('#800080')
            .setDescription("<@" + message.author + "> is now afk" + aMsg);
        if (afkImg !== null) {
            afkEmbed.setImage(afkImg)
        }
        if (typeof afk[message.author.id] !== 'undefined') {
            message.reply("you were already afk, your afk message has been updated:", afkEmbed);
        } else {
            message.channel.send(afkEmbed);
        }
        afk[message.author.id] = {};
        if (afkMsg !== null) {
            afk[message.author.id].message = afkMsg;
        } 
        afk[message.author.id].time = message.createdTimestamp;
        if (afkImg !== null) {
            afk[message.author.id].image = afkImg;
		}
        fs.writeFile('afk.json', JSON.stringify(afk), 'utf8', () => { });
    }
};