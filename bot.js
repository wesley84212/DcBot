require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log('Ready!');
});
client.on('interactionCreate', async interaction => {
			if (!interaction.isCommand()) return;
			const { commandName } = interaction;
			if (commandName === 'ping') {
				await interaction.reply('Pong!');
			} else if (commandName === 'server') {
				await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
			} else if (commandName === '加入組別') {
				const inputStr = interaction.options.getString('input')
				const member = interaction.member;
				const role = interaction.guild.roles.cache.find((r)=>{
					return r.name.indexOf(inputStr) > -1
				});
				if(!!role === false){
					return;
				}
				try{
					member.roles.add(role);
					console.log(`名字: ${interaction.user.tag}\n已加入: ${role.name}`)
					await interaction.user.send(`名字: ${interaction.user.tag}\n已加入: ${role.name}`)
					await interaction.user.send({files:["./test.png"]})
					await interaction.reply(`名字: ${interaction.user.tag}已被傳送`)
				 }catch(e){
					console.log(e)
					console.error(e)
				 }		
		}
	});
client.on("guildMemberAdd", (member) => {
	const guild = member.guild;
	console.log(guild.channels.cache)
})
client.login(process.env.DC_TOKEN);