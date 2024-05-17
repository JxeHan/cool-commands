const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Reminder = require('../../schemas/reminder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reminder')
        .setDescription('Set a reminder')
        .addStringOption(option => 
            option.setName('time')
                .setDescription('When to send the reminder (e.g., "1hr", "30min", "10s").')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('message')
                .setDescription('The reminder message.')
                .setRequired(true)),
    async execute(interaction) {
        const userId = interaction.user.id;
        const timeInput = interaction.options.getString('time');
        const message = interaction.options.getString('message');

        // Function to parse time strings
        const parseTimeString = (timeStr) => {
            const timePattern = /^(\d+)(s|m|h|d)$/; // matches 10s, 5m, 1h, 2d, etc.
            const match = timeStr.match(timePattern);
            if (!match) return null;

            const value = parseInt(match[1], 10);
            const unit = match[2];

            switch (unit) {
                case 's':
                    return value * 1000;
                case 'm':
                    return value * 60 * 1000;
                case 'h':
                    return value * 60 * 60 * 1000;
                case 'd':
                    return value * 24 * 60 * 60 * 1000;
                default:
                    return null;
            }
        };

        const milliseconds = parseTimeString(timeInput);
        if (milliseconds === null) {
            return interaction.reply({ content: 'Invalid time format. Please use "s" for seconds, "m" for minutes, "h" for hours, or "d" for days.', ephemeral: true });
        }

        const reminderTime = new Date(Date.now() + milliseconds);

        try {
            await Reminder.create({ userId, reminderTime, message });

            const embed = new EmbedBuilder()
                .setTitle('Reminder Saved')
                .setDescription(`I'll remind you in ${timeInput}`)
                .setColor('#00FF00');

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.error('Error setting reminder:', error);
            await interaction.reply({ content: 'Failed to set reminder.', ephemeral: true });
        }
    },
};
