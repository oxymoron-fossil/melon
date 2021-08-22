const config = ('./config.json')

module.exports = {
	name: 'servers',
	description: 'Lists the servers that Melon is currently in',
	execute(message, args) {
        if (message.author.id !== config.owner){
			return
		} else {
		const serversEmbed = new Discord.MessageEmbed()
			.setTitle("My Servers")
			.setDescription(`Use \`lon leave <server id>\` to leave a server.`)
			.setColor('#800080')
		client.guilds.cache.forEach(guild => serversEmbed.addField(guild.name, guild.id))
		message.channel.send(serversEmbed)
    }
}
};