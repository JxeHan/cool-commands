const { Client, EmbedBuilder } = require('discord.js');
const Reminder = require('../../Schemas/reminderSchema'); // Adjust the path as necessary

module.exports = async (client = new Client()) => {
    console.log('Reminder event initialized.');

    setInterval(async () => {
        const now = new Date();
        const reminders = await Reminder.find({ reminderTime: { $lte: now } });

        for (const reminder of reminders) {
            try {
                const user = await client.users.fetch(reminder.userId);
                if (user) {
                    const reminderEmbed = new EmbedBuilder()
                    .setTitle('Reminder')
                    .setDescription(`${reminder.message}`)
                    await user.send({ embeds: [reminderEmbed] });
                }
                await Reminder.findByIdAndDelete(reminder._id);
            } catch (error) {
                console.error(`Failed to send reminder for user ${reminder.userId}`, error);
            }
        }
    }, 60000); // Check every minute
};
