const snipe = require('../snipe.json')
const config = require('../config.json')
const Discord = require('discord.js')
const client = new Discord.Client();

module.exports = {
	name: 'snipe',
	description: 'Shows the latest deleted message.',
	async execute(message, args) {
        if (message.channel.parentID == '719700933319196783'){
			return message.reply('Please don\'t use snipe in this category.')
		}
			var cid = message.channel.id
			cid = "s" + cid
			if (typeof snipe[cid] == 'undefined') {
				return message.channel.send(global.autoEmbed("No message has been deleted recently!"));
			}
			var snipeNum = +args[0];
			if (!(snipeNum > 0)) {
				snipeNum = 1;
			} else if (snipeNum > snipe[cid].length) {
				snipeNum = snipe[cid].length;
				return message.reply("the number you chose is too big!");
			}
			const entry = snipe[cid][snipe[cid].length - snipeNum]
			if (message.author.id !== config.owner && message.author.id == entry.id) {
				return message.reply("did you really just try to snipe your own message? What are you, attention seeker?")
			}
			const aId = await client.users.fetch(entry.id)
			const snipeEmbed = new Discord.MessageEmbed()
				.setAuthor(aId.tag, aId.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
				.setDescription(entry.msg)
				.setFooter("Deleted " + millisecondsToLength(Date.now() - entry.time) + "ago")
				.setColor(message.guild.members.cache.has(entry.id) ? message.guild.members.cache.get(entry.id).displayHexColor : "000000")
			if (entry.img) {
				snipeEmbed.setImage(entry.img)
			}
			message.channel.send(snipeEmbed)
			return
    }
};