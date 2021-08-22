const Discord = require('discord.js')

module.exports = {
	name: 'help',
	description: 'Displays Melon\'s help section and lists all available commands.',
	async execute(message, args) {
		if (message.channel.type == 'dm'){return}
		var help
		try {
			help = args[0].toLowerCase()
		}catch{
			help = ''
		}
		const helpEmbed = new Discord.MessageEmbed()
			.setAuthor(message.client.user.tag, message.client.user.displayAvatarURL({ format: 'png', dynamic: true }))
			.setColor('#800080')
		if (help == "utility"||help == "util"){
			helpEmbed
			.setTitle("**Melon's Utility Commands**\n") 
			.addField(" - help", "Displays Melon\'s help section and all available commands.") 
			.addField(" - ping", "Shows the bot's response time and latency.") 
			.addField(" - avatar/av", "Shows the avatar/profile picture of a certain user.")
			.addField(" - urban", "Gives you the Urban Dictionary definition of a term.")
			.addField(" - botlink", 'Shows you the invite linke of a specified bot.')
			.addField(" - invite/link", "The invite link to Melon, if for some reason you need to use it.")
			.addField(" - matheval", 'Evaluates a mathematical expression using math.js')
			.addField(" - snipe", `Shows deleted messages using the format \`lon snipe <number>\``)
			.addField(" - editsnipe", `Shows edited messages, command format is \`lon editsnipe <number>\``)
			.addField(" - linkquote", 'Quotes a message using a message link, with dates and usernames.')
			.setFooter("Still a work in progress, more commands coming soon!")
		}else if(help == "fun"){
			helpEmbed
			.setTitle("**Melon's Fun Commands**\n") 
			.addField(" - afk", "Let\'s others know you\'re AFK and why you are.")
			.addField(" - nimrod", "Determines if you're an idiot, nimrod, nimroy, or the legendary nimroysaurus!") 
			.addField(" - kill", "Kill people with inventive and original ways.")
			.addField(" - say/speak", "Says whatever you say through an embedded message.")
			.addField(" - trash", 'Puts the annoying trash where they belong, the trashcan.')	
			.addField(" - topic", "Gives a random topic, in case there's a dead chat.")
			.addField(" - kms", "Kill yourself in the most ridiculous ways.")
			.setFooter("Still a work in progress, more commands coming soon!")
		}else if(help == "nsd" && message.channel.type !== 'dm' && message.guild.id == '712940456358707200'){
			helpEmbed
			.setTitle("**Melon's NSD Commands**\n")
			.addField(" - confess", "Send a completely anonymous message to the confession channel. Use this command in DM's with Melon.")
			.addField(" - newhex", "Change the hex code/color of your confessions. Use this command in DM's with Melon.")
			.setFooter("You can DM me with suggestions for new custom NSD commands!")
		}else {
			helpEmbed
			.setTitle("**Melon's Commands List**\n")
			.setDescription(`Use \`\`Lon help <Category> \`\` in order to view the commands in each.\n Below are all the command categories.`)
			.addField("Utilty/util", 'View the utility commands category.')
			.addField("Fun", 'View the fun commands category.')
			if(message.guild.id !== '712940456358707200'){
				helpEmbed.addField("\u200B", "[Join the Melon Support Server!](https://discord.gg/XBBXvNd)") 
			}
			if (message.guild.id == '712940456358707200'){
				helpEmbed.addField("NSD", 'View the custom NSD server commands category!')
			}
		}
		message.channel.send(helpEmbed)
    }
};