const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Search } = require('../../utils/search');
const axios = require('axios').default;

module.exports = {
    name: 'dog',

    interaction: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Show dog\'s images')
        .addStringOption(option =>
            option.setName('breed')
                .setDescription('Breed')
        )
    ,

    /*
        'ctx.client' represent as client
        'ctx.action' represent as message or interaction.
        'ctx.type'   represent as type of action, values: interaction or message
     */

    async run(ctx) {
        const breeds = {
            'affenpinscher': 'Affenpinscher',
            'african': 'African',
            'airedale': 'Airedale',
            'akita': 'Akita',
            'appenzeller': 'Appenzeller',
            'australian': 'Shepherd Australian',
            'basenji': 'Basenji',
            'beagle': 'Beagle',
            'bluetick': 'Bluetick',
            'borzoi': 'Borzoi',
            'bouvier': 'Bouvier',
            'boxer': 'Boxer',
            'brabancon': 'Brabancon',
            'briard': 'Briard',
            'buhund': 'Norweigian Buhund',
            'bulldog': 'Bulldog',
            'bullterrier': 'Staffordshire Bullterrier',
            'cattledog': 'Australian Cattledog',
            'chihuahua': 'Chihuahua',
            'chow': 'Chow',
            'clumber': 'Clumber',
            'cockapoo': 'Cockapoo',
            'collie': 'Border Collie',
            'coonhound': 'Coonhound',
            'corgi': 'Cardigan Corgi',
            'cotondetulear': 'Cotondetulear',
            'dachshund': 'Dachshund',
            'dalmatian': 'Dalmatian',
            'dane': 'Great Dane',
            'deerhound': 'Scottish Deerhound',
            'dhole': 'Dhole',
            'dingo': 'Dingo',
            'doberman': 'Doberman',
            'elkhound': 'Norweigian Elkhound',
            'entlebucher': 'Entlebucher',
            'eskimo': 'Eskimo',
            'finnish': 'Finnish',
            'frise': 'Frise',
            'germanshepherd': 'German Shepherd',
            'greyhound': 'Greyhound',
            'groenendael': 'Groenendael',
            'havanese': 'Havanese',
            'hound': 'Hound',
            'husky': 'Husky',
            'keeshond': 'Keeshond',
            'kelpie': 'Kelpie',
            'komondor': 'Komondor',
            'kuvasz': 'Kuvasz',
            'labradoodle': 'Labradoodle',
            'labrador': 'Labrador',
            'leonberg': 'Leonberg',
            'lhasa': 'Lhasa',
            'malamute': 'Malamute',
            'malinois': 'Malinois',
            'maltese': 'Maltese',
            'mastiff': 'Mastiff',
            'mexicanhairless': 'Mexican Hairless',
            'mix': 'Mix',
            'mountain': 'Mountain',
            'newfoundland': 'Newfoundland',
            'otterhound': 'Otterhound',
            'ovcharka': 'Ovcharka',
            'papillon': 'Papillon',
            'pekinese': 'Pekinese',
            'pembroke': 'Pembroke',
            'pinscher': 'Pinscher',
            'pitbull': 'Pitbull',
            'pointer': 'Pointer',
            'pomeranian': 'Pomeranian',
            'poodle': 'Poodle',
            'pug': 'Pug',
            'puggle': 'Puggle',
            'pyrenees': 'Pyrenees',
            'redbone': 'Pedbone',
            'retriever': 'Golden Retriever',
            'ridgeback': 'Ridgeback',
            'rottweiler': 'Rottweiler',
            'saluki': 'Saluki',
            'samoyed': 'Samoyed',
            'schipperke': 'Schipperke',
            'schnauzer': 'Schnauzer',
            'setter': 'Setter',
            'sheepdog': 'Sheepdog',
            'shiba': 'Shiba',
            'shihtzu': 'Shih Tzu',
            'spaniel': 'Spaniel',
            'springer': 'Springer',
            'stbernard': 'Saint Bernard',
            'terrier': 'Terrier',
            'vizsla': 'Vizsla',
            'waterdog': 'Waterdog',
            'weimaraner': 'Weimaraner',
            'whippet': 'Whippet',
            'wolfhound': 'Wolfhound'
        };

        const arg = ctx.type === 'interaction' ? ctx.options.getString('breed') : ctx.args.join(' ');

        const breed = await Search(arg, breeds);

        if (breed) {
            await axios.get('https://dog.ceo/api/breed/'+breed+'/images/random').then((response) => {
               return ctx.sendEmbed(new MessageEmbed()
                   .setColor('PURPLE')
                   .setTitle('สุ่มรูปภาพสุนัข ('+breeds[breed]+')')
                   .setImage(response.data.message)
               );
            });
        } else {
            await axios.get('https://dog.ceo/api/breeds/image/random').then((response) => {
                return ctx.sendEmbed(new MessageEmbed()
                    .setColor('PURPLE')
                    .setTitle('สุ่มรูปภาพสุนัข')
                    .setImage(response.data.message)
                );
            });
        }
    }
}
