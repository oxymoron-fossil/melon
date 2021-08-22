const Discord = require('discord.js')

module.exports = {
	name: 'say',
	description: 'Says whatever you want to say in embed form.',
	execute(message, args) {
		if(!args[0]) return message.channel.send("Well what do you want me to say?") 
		message.channel.bulkDelete(1)
		const embed = new Discord.MessageEmbed()
		    .setAuthor(message.author.tag , message.author.displayAvatarURL({ format: 'png', dynamic: true }) )
			.setDescription(args.slice(0).join(" ")) 
			.setColor('#800080')
		message.channel.send(embed)
    }
};