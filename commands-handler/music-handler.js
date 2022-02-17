const { Player } = require('discord-player');
const { MessageEmbed } = require("discord.js");
const EndTimeout = require("../utils/Music/endTimeout");

const endTimeout = new EndTimeout();

module.exports = {
    registerMusic(client) {
        client.player = new Player(client, {
            ytdlOptions: {
                requestOptions: {
                    headers: {
                        cookie: process.env.YT_COOKIE
                    }
                }
            }
        });

        const player = client.player;

        player
            .on('trackStart', (queue, track) => {
                queue.metadata.send({embeds: [new MessageEmbed()
                        .setColor('#0099ff')
                        .setDescription('เริ่มเล่นเพลง: ['+ track.title +']('+ track.url +')')
                        .setFooter('ร้องขอโดย: '+ track.requestedBy.tag, track.requestedBy.displayAvatarURL())]
                });
            })
            .on('trackAdd', (queue, track) => {
                endTimeout.clearTimeout(queue);
            })
            .on('tracksAdd', (queue, track) => {
                endTimeout.clearTimeout(queue);
            })
            .on('channelEmpty', (queue => {
                endTimeout.clearTimeout(queue);
            }))
            .on('queueEnd', (queue => {
                endTimeout.setTimeout(queue);
            }))
            .on('botDisconnect', (queue => {
                endTimeout.clearTimeout(queue);
            }))
            // .on('error', (queue, error) => {
            //     console.log(`Error at ${queue.guild.id} | ${error.message}`);
            // })
            // .on('debug', (queue, string) => {
            //     //console.log(queue);
            //     console.log(string);
            // })
            // .on('connectionCreate', (queue, connection) => {
            //     console.log(connection)
            // })
            // .on('connectionError', (queue, error) => {
            //     console.log(error)
            // })
        ;
    }
}
