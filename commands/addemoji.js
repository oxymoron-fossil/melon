const Discord = require('discord.js')

module.exports = {
	name: 'addemoji',
	description: 'Automatically adds and stores an emoji to the server.',
	async execute(message, args) {
        if (message.member.hasPermission('MANAGE_EMOJIS') == false) return message.reply("you lack the manage emoji permission to add emojis.");
        var url, name, a
        if (message.attachments.first()) {
            url = message.attachments.first().url
            name = args[0] ? args[0] : message.attachments.first().name.split(".")[0]
        } else if (args[0]) {
            url = args[0]
            name = args[1]
            if (args[0]) a = args[0].match(/<a?:.+?:\d+>/g)
            if (a) {
                const x = a[0].split(/<|:|>/g).filter(item => item.length)
                if (x.length == 3) {
                    url = `https://cdn.discordapp.com/emojis/${x[2]}.gif`
                    name ? false : name = x[1]
                }
                else {
                    url = `https://cdn.discordapp.com/emojis/${x[1]}.png`
                    name ? false : name = x[0]
                }
            }
        }
    }
};
