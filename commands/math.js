const math = require('mathjs')
const Discord = require('discord.js')
module.exports = {
	name: 'math',
	description: 'Evaluates mathematical expressions using math.js',
	async execute(message, args) {
        if (!args[0]){
			message.channel.send('Eval string is required for calculation.')
		}
		else{
		try {
			const evalRes = math.evaluate(args.join(" "))
			const result = new Discord.MessageEmbed()
				.setColor('#800080')
				.setTitle("Result:")
				.setDescription(`${evalRes}`)
			message.channel.send(result).catch(err => message.channel.send(`\`\`\`js\n${err}\`\`\``))
		} catch (error) {
		message.channel.send(`\`\`\`js\n${error}\`\`\``)
		return
	}
		}
    }
};