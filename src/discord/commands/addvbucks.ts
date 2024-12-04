import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { EmbedBuilder } from "discord.js";
import Profile from '../../database/models/profiles';

module.exports = {
    data = new SlashCommandBuilder()
    .setName("addvbucks")
}