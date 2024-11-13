const { SlashCommandBuilder, ModalBuilder, TextInputStyle, TextInputBuilder, ActionRowBuilder, RoleSelectMenuBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register character'),
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId("registration")
            .setTitle("Ascendency Raid Registration");
        
        const charNameInput = new TextInputBuilder()
            .setCustomId("character_name")
            .setLabel("What is your characters name")
            .setStyle(TextInputStyle.Short);

        const roleInput = new TextInputBuilder()
            .setCustomId("character_role")
            .setLabel("What is your characters role?")
            .setStyle(TextInputStyle.Short);

        const primaryWeaponInput = new TextInputBuilder()
            .setCustomId("primary")
            .setLabel("What is your characters primary weapon?")
            .setStyle(TextInputStyle.Short);

        const secondaryWeaponInput = new TextInputBuilder()
            .setCustomId("secondary")
            .setLabel("What is your characters secondary weapon?")
            .setStyle(TextInputStyle.Short);
        
        rows = [
            new ActionRowBuilder().addComponents(charNameInput),
            new ActionRowBuilder().addComponents(roleInput),
            new ActionRowBuilder().addComponents(primaryWeaponInput),
            new ActionRowBuilder().addComponents(secondaryWeaponInput)
        ];

        modal.addComponents(...rows);
        
        await interaction.showModal(modal);

        await interaction.reply({ content: `Name: ${interaction.fields.getTextInput("character_name")}\nRole: ${interaction.fields.getTextInput("character_role")}\nPrimary: ${interaction.fields.getTextInput("primary")}\nSecondary: ${interaction.fields.getTextInput("secondary")}`})
    }
}