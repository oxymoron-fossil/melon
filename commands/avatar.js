module.exports = {
	name: 'avatar',
	description: 'Shows the avatar/profile picture of a certain user.',
	alias: ['av'],
	async execute(message, args) {
		var messageUser = global.guildFind(message)
		return message.channel.send(messageUser.displayAvatarURL({dynamic: true, format: 'png', size: 1024}))
    }
}