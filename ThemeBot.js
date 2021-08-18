const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
//put your bots token in the const token
const token = 'your_bot_token';
var json = [
    {id: 0, in_vc: false},
    {id: 1, bot_channel_id: ""}
]




client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); 
})
client.on('message', message => {
//command !joinvc to join the user's vc
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
            fs.writeFileSync(`file path of /ThemeBot_data.json`, (JSON.stringify(json)))
            var in_vc_json = fs.readFileSync(`file path of /ThemeBot_data.json` , {encoding:'utf8', flag:'r'})
            var in_vc_data = JSON.parse(in_vc_json)
            console.log(in_vc_data[objIndex].in_vc)
        }).catch(e => {
            // Oh no, it errored! Let's log it to console :)
            console.error(e);
        })
    }
//command !leavevc to leave the user's vc
    if (message.content == `!leavevc`) {
        var channelid = message.member.voice.channelID;
        const channel = client.channels.cache.get(channelid);
        if (!channel) return console.error("The channel does not exist!");
        channel.leave()
        objIndex = json.findIndex((obj => obj.id == 0));
        json[objIndex].in_vc = false
        fs.writeFileSync(`file path of /ThemeBot_data.json`, (JSON.stringify(json)))
        var in_vc_json = fs.readFileSync(`file path of /ThemeBot_data.json` , {encoding:'utf8', flag:'r'})
        var in_vc_data = JSON.parse(in_vc_json)
        console.log(in_vc_data[objIndex].in_vc)
    }

})

client.on('voiceStateUpdate', (oldMember, newMember) =>{

    var in_vc_json = fs.readFileSync(`file path of /ThemeBot_data.json` , {encoding:'utf8', flag:'r'})
    objIndex = json.findIndex((obj => obj.id == 1));
    var in_vc_data = JSON.parse(in_vc_json)
    var vc_to_join_id = in_vc_data[objIndex].bot_channel_id
    var monsieur_vc = client.channels.cache.get(vc_to_join_id);
    let thepersonid = newMember.id
//require's ffmpeg to work
//checks if someone joined the bot's vc
    if (newMember.channelID == vc_to_join_id){
        if (oldMember.channelID != vc_to_join_id){
            console.log("someone joined my channel")
            monsieur_vc.join().then(connection =>{
                //you can put for the case the users id and the theme in the connect.play()
                        switch (thepersonid) {
                            case 'user_id':
                                connection.play(`mp3 file path`)
                                break;
                            case 'user_id':
                                connection.play(`mp3 file path`)
                                break;
                            case 'user_id':
                                connection.play(`mp3 file path`)
                                break;
                                //if none of the cases play then the default theme will
                            default:
                                connection.play('mp3 file path')
                                break;
                        }
                    
            })
        }
    }

//checks if someone left the bot's vc
    if (newMember.channelID != vc_to_join_id){
        var in_vc_json = fs.readFileSync(`file path of /ThemeBot_data.json` , {encoding:'utf8', flag:'r'})
        objIndex = json.findIndex((obj => obj.id == 1));
        var in_vc_data = JSON.parse(in_vc_json)
        var vc_to_join_id = in_vc_data[objIndex].bot_channel_id
        var mr_vc = client.channels.cache.get(vc_to_join_id);
        if (oldMember.channelID == vc_to_join_id){
            console.log("someone left my channel")
            mr_vc.join().then(connection =>{
                        switch (thepersonid) {
                                //you can put for the case the users id and the theme in the connect.play()
                            case 'user_id':
                                connection.play(`mp3 file path`)
                                break;
                            case 'user_id':
                                connection.play(`mp3 file path`)
                                break;
                            case 'user_id':
                                connection.play(`mp3 file path`)
                                break;
                            default:
                                connection.play('mp3 file path')
                                break;
                                
                        }
                    
            })
        }
    }

})
client.login(token)
