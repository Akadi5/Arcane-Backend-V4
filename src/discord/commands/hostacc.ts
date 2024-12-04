import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { EmbedBuilder } from "discord.js";
import User from "../../database/models/user";
import profileman from "../../utils/user/profileman";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Create An host Account On ArcaneV4!")
    .addStringOption((option) =>
      option
        .setName("password")
        .setDescription("Your Password Which Will Be Used To Login.")
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const password = interaction.options.getString("password");
    const userId = interaction.user.id;

    function generateAccountId(): string {
      const uuid = uuidv4();
      const accountId = uuid.replace(/-/g, "").substring(0, 32);
      return accountId.toUpperCase();
    }

    function generateuserId(): string {
        const uuid = uuidv4();
        const userId = uuid.replace(/-/g, "").substring(0, 16);
        return userId.toLowerCase();
    }

    if (!password) {
      return interaction.reply({
        content: "All fields are required!",
        ephemeral: true,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const existingUser = await User.findOne({ discordId: userId });

      if (existingUser) {
        const embed = new EmbedBuilder()
          .setColor("#ff0000")
          .setTitle("Failed To Create An Host Account!")
          .setDescription("Reason: a host account already exists!");

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }

      const newUser = new User({
        created: new Date(),
        banned: false,
        discordId: generateuserId,
        accountId: generateAccountId(),
        username: "gameserver",
        username_lower: "gameserver",
        email: "host@arcanev4.com",
        password: hashedPassword,
      });
      profileman.createProfile(newUser.accountId);
      await newUser.save();

      const embed = new EmbedBuilder()
        .setColor("#a600ff")
        .setTitle("Host account created successfuly!")
        .addFields(
          {
            name: "Email Adress",
            value: `||host@arcanev4.com||`,
            inline: false,
          }
        );

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error("Error registering user:", error);
      await interaction.reply({
        content:
          "There was an error registering your account. Please try again later.",
        ephemeral: true,
      });
    }
  },
};
