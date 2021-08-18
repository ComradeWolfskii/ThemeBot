const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const token = 'ODIzMjA1NDQzMzMyNDcyODYy.YFdb0A.i7H8oU05QXPeWPhwu2LRs_i38AA';
//var disconnect_user = [368578349892632576n]
var json = [
    {id: 0, in_vc: false},
    {id: 1, bot_channel_id: ""}
]




client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); 
})
client.on('message', message => {
   if (message.content === '!joinvc'){
        var channelid = message.member.voice.channelID;
       
        const channel = client.channels.cache.get(channelid);
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
            console.log("Successfully connected.");
            objIndex = json.findIndex((obj => obj.id == 1));
            json[objIndex].bot_channel_id = channelid
            objIndex = json.findIndex((obj => obj.id == 0));
            json[objIndex].in_vc = true
            fs.writeFileSync(`C:/Users/miste/OneDrive/Desktop/notification_bot/ThemeBot_data.json`, (JSON.stringify(json)))
            var in_vc_json = fs.readFileSync(`C:/Users/miste/OneDrive/Desktop/notification_bot/ThemeBot_data.json` , {encoding:'utf8', flag:'r'})
            var in_vc_data = JSON.parse(in_vc_json)
            console.log(in_vc_data[objIndex].in_vc)
        }).catch(e => {
            // Oh no, it errored! Let's log it to console :)
            console.error(e);
        })
    }
    if (message.content == `!leavevc`) {
        var channelid = message.member.voice.channelID;
        const channel = client.channels.cache.get(channelid);
        if (!channel) return console.error("The channel does not exist!");
        channel.leave()
        objIndex = json.findIndex((obj => obj.id == 0));
        json[objIndex].in_vc = false
        fs.writeFileSync(`C:/Users/miste/OneDrive/Desktop/notification_bot/ThemeBot_data.json`, (JSON.stringify(json)))
        var in_vc_json = fs.readFileSync(`C:/Users/miste/OneDrive/Desktop/notification_bot/ThemeBot_data.json` , {encoding:'utf8', flag:'r'})
        var in_vc_data = JSON.parse(in_vc_json)
        console.log(in_vc_data[objIndex].in_vc)
    }

})

client.on('voiceStateUpdate', (oldMember, newMember) =>{

//    for (var i = 0; i < disconnect_user.length; i++){
//        let voice = newMember.member.voice
//        let user = newMember.member.displayName
//       let voicechannel = newMember.member.voice.channelID
//        const channel = client.channels.cache.get(voicechannel);
        //console.log(voice)
//        if (newMember.id == disconnect_user[i]){
//            if (newMember.channelID != null){
//                console.log('they are in the vc')
//                voice.kick()
//                console.log(`${user} has been kicked from vc`)
//       }
//    }}


    var in_vc_json = fs.readFileSync(`C:/Users/miste/OneDrive/Desktop/notification_bot/ThemeBot_data.json` , {encoding:'utf8', flag:'r'})
    objIndex = json.findIndex((obj => obj.id == 1));
    var in_vc_data = JSON.parse(in_vc_json)
    var vc_to_join_id = in_vc_data[objIndex].bot_channel_id
    var monsieur_vc = client.channels.cache.get(vc_to_join_id);
    let thepersonid = newMember.id


    if (newMember.channelID == vc_to_join_id){
        if (oldMember.channelID != vc_to_join_id){
            console.log("someone joined my channel")
            monsieur_vc.join().then(connection =>{
                        switch (thepersonid) {
                            case '359836288851116036':
                                connection.play(`C:/Users/miste/OneDrive/Desktop/notification_bot/themes/Bitconnect Screaming 2 - Sound effect.mp3`)
                                break;
                            case '360390822916653056':
                                connection.play(`C:/Users/miste/OneDrive/Desktop/notification_bot/themes/Normal Sharingan Sound Effect.mp3`)
                                break;
                            case '498546643818512404':
                                connection.play(`C:/Users/miste/OneDrive/Desktop/notification_bot/themes/Benji.mp3`)
                                break;
                            default:
                                connection.play('C:/Users/miste/OneDrive/Desktop/notification_bot/themes/Super Smash Bros Ultimate Challenger Approaching TEMPLATE.mp3')
                                break;
                        }
                    
            })
        }
    }


    if (newMember.channelID != vc_to_join_id){
        var in_vc_json = fs.readFileSync(`C:/Users/miste/OneDrive/Desktop/notification_bot/ThemeBot_data.json` , {encoding:'utf8', flag:'r'})
        objIndex = json.findIndex((obj => obj.id == 1));
        var in_vc_data = JSON.parse(in_vc_json)
        var vc_to_join_id = in_vc_data[objIndex].bot_channel_id
        var mr_vc = client.channels.cache.get(vc_to_join_id);
        if (oldMember.channelID == vc_to_join_id){
            console.log("someone left my channel")
            mr_vc.join().then(connection =>{
                        switch (thepersonid) {
                            case '359836288851116036':
                                connection.play(`C:/Users/miste/OneDrive/Desktop/notification_bot/themes/Bitconnect Screaming 2 - Sound effect.mp3`)
                                break;
                            case '360390822916653056':
                                connection.play(`C:/Users/miste/OneDrive/Desktop/notification_bot/themes/Enen no shouboutaiBast sfx ll.mp3`)
                                break;
                            case '498546643818512404':
                                connection.play(`C:/Users/miste/OneDrive/Desktop/notification_bot/themes/Benji.mp3`)
                                break;
                            default:
                                connection.play('C:/Users/miste/OneDrive/Desktop/notification_bot/themes/Super Smash Bros (3DSWii U, Ultimate) - Blast KO sound.mp3')
                                break;
                                
                        }
                    
            })
        }
    }

})
client.login(token)