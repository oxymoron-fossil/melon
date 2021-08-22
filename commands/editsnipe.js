const snipe = require('../snipe.json')

module.exports = {
	name: 'editsnipe',
	description: 'Shows the latest edited message.',
	async execute(message, args) {
        if (message.channel.parentID == '719700933319196783'){
			return message.reply('Please don\'t use editsnipe in this category.')
		}
		var cid = message.channel.id
		cid = "e" + cid
		if (typeof snipe[cid] == 'undefined'){
			return message.channel.send(global.autoEmbed("No message has been edited recently!"));
		}
		var editsnipeNum = +args[0];
		if(!(editsnipeNum > 0)) {
			editsnipeNum = 1;
		 } else if (editsnipeNum > snipe[cid].length){
			return message.reply("the number you chose is too big!");
		 }
		 const entry = snipe[cid][snipe[cid].length - editsnipeNum]
		 if (message.author.id !== config.owner && message.author.id == entry.id){
			 return message.reply("did you really just try to editsnipe your own message? You should know what it says.")
		 }
		 const aId = await client.users.fetch(entry.id)
		 const editsnipeEmbed = new Discord.MessageEmbed()
			 .setAuthor(aId.tag, aId.displayAvatarURL({dynamic: true, format:'png', size: 1024}))
			 .setDescription(entry.msg)
			 .setFooter("Edited " + millisecondsToLength(Date.now() - entry.time)+ "ago")
			 .setColor(message.guild.members.cache.has(entry.id) ? message.guild.members.cache.get(entry.id).displayHexColor : "000000")
			if (entry.img) {
				editsnipeEmbed.setImage(entry.img)
			}
			message.channel.send(editsnipeEmbed)

    }
};