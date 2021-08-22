const config = require('/home/yuchen/coding/melon/config.json')

module.exports = {
	name: 'eval',
	description: 'Evaluates lines of code and executes arguements',
	async execute(message, args) {
        if (message.author.id !== config.owner) return message.channel.send("Hey, only my developer can use this command.")

		var printRes = true
		const evalChannel = message.channel
		var evalArgs = message.content.slice(config.prefix.length).trim().split(' ')
		evalArgs.shift()
		evalArgs = evalArgs.join(' ').trim()
		if (args[0] === 'return') {
			printRes = false
			evalArgs = evalArgs.split(' ')
			evalArgs.shift()
			evalArgs = evalArgs.join(' ').trim()
		}
		try {
			const evalRes = eval(evalArgs)
			if (JSON.stringify(evalRes) && JSON.stringify(evalRes).includes(config.token)) return evalChannel.send('?????', new Discord.MessageAttachment('https://media.discordapp.net/attachments/651657225126805514/741459619398025276/unknown.png'))
			if (printRes) evalChannel.send(`\`\`\`js\n${typeof evalRes}\`\`\`` + `\`\`\`js\n${JSON.stringify(evalRes) ? JSON.stringify(evalRes) : evalRes ? evalRes.toString() : JSON.stringify(evalRes)}\`\`\``).catch(err => evalChannel.send(`\`\`\`js\n${err.name}\`\`\`\n\`\`\`js\n${err.message}\`\`\``))
		} catch (error) {
			evalChannel.send(`\`\`\`js\n${error.name}\`\`\`\n\`\`\`js\n${error.message}\`\`\``)
			return
		}
    }
};