const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get avatars')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Get the avatar of a user')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('Select a user')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('guild')
                .setDescription('Get the server icon')
        ),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case 'user':
                await getAvatarUser(interaction);
                break;

            case 'guild':
                await getAvatarGuild(interaction);
                break;

            default:
                break;
        }
    },
};

async function getAvatarUser(interaction) {
    const targetUser = interaction.options.getUser('user') || interaction.user;
    const avatarURL = targetUser.displayAvatarURL({ dynamic: true, size: 4096 });

    const embed = new EmbedBuilder()
        .setColor('a4aafe')
        .setTitle(`${targetUser.username}'s Avatar`)
        .setImage(avatarURL);

    await interaction.reply({ embeds: [embed] });
}

async function getAvatarGuild(interaction) {
    const guild = interaction.guild;
    const iconURL = guild.iconURL({ dynamic: true, size: 4096 });

    const embed = new EmbedBuilder()
        .setColor('a4aafe')
        .setTitle(`${guild.name}'s Icon`)
        .setImage(iconURL);

    await interaction.reply({ embeds: [embed] });
}
