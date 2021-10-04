const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./auth.json');

// const commands = [
// 	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
// 	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
// 	new SlashCommandBuilder()
//         .setName('user').setDescription('Replies with user info!')
//         .addUserOption(option => option.setName('user').setDescription('Select a user'))
// ]
// 	.map(command => command.toJSON());
const commands = [];
const data = new SlashCommandBuilder()
    .setName('加入組別')
    .setDescription('Replies with Pong!')
    .addStringOption(option => option.setName('input').setDescription('The input to echo back'))

commands.push(data.toJSON());
const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);