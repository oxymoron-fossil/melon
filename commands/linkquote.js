const Discord = require('discord.js')
const client = new Discord.Client();

module.exports = {
	name: 'linkquote',
	description: 'Quotes a message using a message link, with dates and usernames.',
	async execute(message, args) {
        const linkQuote = await client.channels.cache.get(args[0].split("/").slice(-2)[0]).messages.fetch(args[0].split("/").slice(-1)[0])
		const linkEmbed = new Discord.MessageEmbed()
			.setColor('#800080')
			.setAuthor(linkQuote.author.tag + " said...", linkQuote.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.setDescription(linkQuote)
			.addField("\u200B", `[Jump to Message](${linkQuote.url})`)
			.setFooter("Message sent at: " + new Date(linkQuote.createdTimestamp).toLocaleString())
			if (linkQuote.attachments.first()) {
				linkEmbed.setImage(linkQuote.attachments.first().proxyURL)
			}
		
		message.channel.send(linkEmbed)
    }
};