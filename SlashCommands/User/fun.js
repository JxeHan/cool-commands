const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fun')
        .setDescription('Fun commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('clap')
                .setDescription('Turn your text into 👏clap👏 format')
                .addStringOption(option =>
                    option.setName('text')
                        .setDescription('The text to turn into clap format')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('8ball')
                .setDescription('Ask the magic 8-ball a question')
                .addStringOption(option =>
                    option.setName('question')
                        .setDescription('The question to ask the 8-ball')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('coinflip')
                .setDescription('Flip a coin and get heads or tails')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('dadjoke')
                .setDescription('Get a dad joke')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('aesthetics')
                .setDescription('Convert your text into aesthetics style')
                .addStringOption(option =>
                    option.setName('text')
                        .setDescription('The text to convert into aesthetics style')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('emojify')
                .setDescription('Change text to emojis')
                .addStringOption(option => option.setName('text').setDescription('The text to convert').setRequired(true).setMaxLength(2000).setMinLength(1))
                .addStringOption(option => option.setName('hidden').setDescription('Hide this message?').addChoices({ name: 'Hidden', value: 'true'}, { name: 'Not Hidden', value: 'false' }).setRequired(false)),


        ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case 'clap':
                await clapCommand(interaction);
                break;

            case '8ball':
                await eightBallCommand(interaction);
                break;

            case 'coinflip':
                await coinflipCommand(interaction);
                break;

            case 'dadjoke':
                await dadJokeCommand(interaction);
                break;

            case 'aesthetics':
                await aestheticsCommand(interaction);
                break;

            case 'emojify':
                await emojifyCommand(interaction);
                break;

            default:
                break;
        }
    },
};

async function clapCommand(interaction) {
    const text = interaction.options.getString('text');
    const clapText = text.split(' ').join(' 👏 ') + ' 👏';
    await interaction.reply(clapText);
}

async function eightBallCommand(interaction) {
    const responses = [
        'Yes',
        'No',
        'Ask again later',
        'Cannot predict now',
        'Don\'t count on it',
        'Maybe',
        'Outlook not so good',
        'Certainly',
        'Absolutely not'
    ];
    const question = interaction.options.getString('question');
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await interaction.reply(`**Question:** ${question}\n**Answer:** ${randomResponse}`);
}

async function coinflipCommand(interaction) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    await interaction.reply(`The coin landed on: ${result}`);
}

async function dadJokeCommand(interaction) {
    // You can use an API or a library for dad jokes. For simplicity, let's use a placeholder.
    const dadJokes = [
        "I'm afraid for the calendar. Its days are numbered.",
        "My wife said I should do lunges to stay in shape. That would be a big step forward.",
        "Why do fathers take an extra pair of socks when they go golfing? In case they get a hole in one!",
        "Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera.",
        "What do a tick and the Eiffel Tower have in common? They're both Paris sites.",
        "What do you call a fish wearing a bowtie? Sofishticated.",
        "How do you follow Will Smith in the snow? You follow the fresh prints.",
        "If April showers bring May flowers, what do May flowers bring? Pilgrims.",
        "I thought the dryer was shrinking my clothes. Turns out it was the refrigerator all along.",
        "How does dry skin affect you at work? You don't have any elbow grease to put into it.",
        "What do you call a factory that makes okay products? A satisfactory.",
        "Dear Math, grow up and solve your own problems.",
        "What did the janitor say when he jumped out of the closet? Supplies!",
        "Have you heard about the chocolate record player? It sounds pretty sweet.",
        "What did the ocean say to the beach? Nothing, it just waved.",
        "Why do seagulls fly over the ocean? Because if they flew over the bay, we'd call them bagels.",
        "I only know 25 letters of the alphabet. I don't know y.",
        "How does the moon cut his hair? Eclipse it.",
        "What did one wall say to the other? I'll meet you at the corner.",
        "What did the zero say to the eight? That belt looks good on you.",
        "A skeleton walks into a bar and says, 'Hey, bartender. I'll have one beer and a mop.'",
        "Where do fruits go on vacation? Pear-is!",
        "I asked my dog what's two minus two. He said nothing.",
        "What did Baby Corn say to Mama Corn? Where's Pop Corn?",
        "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
        "What does a sprinter eat before a race? Nothing, they fast!",
        "Where do you learn to make a banana split? Sundae school.",
        "What has more letters than the alphabet? The post office!",
        "Dad, did you get a haircut? No, I got them all cut!",
        "What do you call a poor Santa Claus? St. Nickel-less.",
        "I got carded at a liquor store, and my Blockbuster card accidentally fell out. The cashier said never mind.",
        "Where do boats go when they're sick? To the boat doc.",
        "I don't trust those trees. They seem kind of shady.",
        "My wife is really mad at the fact that I have no sense of direction. So I packed up my stuff and right!",
        "How do you get a squirrel to like you? Act like a nut.",
        "Why don't eggs tell jokes? They'd crack each other up.",
        "I don't trust stairs. They're always up to something.",
        "What do you call someone with no body and no nose? Nobody knows.",
        "Did you hear the rumor about butter? Well, I'm not going to spread it!",
        "Why couldn't the bicycle stand up by itself? It was two tired.",
        "What did one hat say to the other? Stay here! I'm going on ahead.",
        "Why did Billy get fired from the banana factory? He kept throwing away the bent ones.",
        "Dad, can you put my shoes on? No, I don't think they'll fit me.",
        "Why can't a nose be 12 inches long? Because then it would be a foot.",
        "What does a lemon say when it answers the phone? Yellow!",
        "This graveyard looks overcrowded. People must be dying to get in.",
        "What kind of car does an egg drive? A yolkswagen.",
        "Dad, can you put the cat out? I didn't know it was on fire.",
        "How do you make 7 even? Take away the s.",
        "How does a taco say grace? Lettuce pray.",
        "What time did the man go to the dentist? Tooth hurt-y.",
        "Why didn't the skeleton climb the mountain? Because he didn't have the guts."
    ];    

    const randomJoke = dadJokes[Math.floor(Math.random() * dadJokes.length)];
    await interaction.reply(randomJoke);
}

async function aestheticsCommand(interaction) {
    const text = interaction.options.getString('text');
    const aestheticsText = convertToAesthetics(text);
    await interaction.reply(aestheticsText);
}


async function emojifyCommand(interaction) {
    const { options } = interaction;
    const text = options.getString('text');
    var hidden = options.getString('hidden') || false;

    if (hidden == 'true') hidden = true;
    else if (hidden == 'false') hidden = false;

    var emojiText = text
    .toLowerCase()
    .split('')
    .map((letter) => {
        const regex = /[A-Za-z]+$/;
        if (letter == ' ') return ' ';

        if (regex.test(letter)) {
            return `:regional_indicator_${letter}:`
        } else {
            return letter;
        }
    })
    .join('');

    if (emojiText.length >= 2000) emojiText = 'I cant emojify this text, it is too long!';

    await interaction.reply({ content: emojiText, ephermal: hidden });
}

function convertToAesthetics(text) {
    // This is a simple conversion. You can customize it further if needed.
    const aestheticsChars = {
        a: '𝒶',
        b: '𝒷',
        c: '𝒸',
        d: '𝒹',
        e: 'ℯ',
        f: '𝒻',
        g: 'ℊ',
        h: '𝒽',
        i: '𝒾',
        j: '𝒿',
        k: '𝓀',
        l: '𝓁',
        m: '𝓂',
        n: '𝓃',
        o: 'ℴ',
        p: '𝓅',
        q: '𝓆',
        r: '𝓇',
        s: '𝓈',
        t: '𝓉',
        u: '𝓊',
        v: '𝓋',
        w: '𝓌',
        x: '𝓍',
        y: '𝓎',
        z: '𝓏',
        ' ': ' ',
    };

    return text.toLowerCase().split('').map(char => aestheticsChars[char] || char).join('');
}
