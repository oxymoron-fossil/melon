module.exports = {
	name: 'ping',
	description: 'Shows the bot\'s response time.',
	execute(message, args) {
        message.channel.send("Pong! Melon's ping is " + client.ws.ping + 'ms!')
	},
};