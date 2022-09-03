const Discord = require('discord.js')
const discordVars = require('./discord_vars.json')

fs = require('fs')

const discordLinksJson = require('./discord_links.json')

const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.MessageContent] })

let linkChannel

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  linkChannel = await client.channels.cache.get(discordVars.CHANNELID)

})

async function getDiscordLink(imageLink){

  if(discordLinksJson[imageLink] != undefined){
    return discordLinksJson[imageLink]
  }

  return await linkChannel.send({content: `Link: ${imageLink}`}).then(async sent => { // 'sent' is that message you just sent
    try{
      let embedLink = await sent.embeds[0].data.thumbnail.proxy_url

      embedLink = embedLink.replace(/images-ext-1.discordapp.net/,"media.discordapp.net")

      discordLinksJson[imageLink] = embedLink
        var json_str = JSON.stringify(discordLinksJson, null, 2)
        fs.writeFile("discord_links.json", json_str, function (err) {
            if (err) return console.log(err);
        })

      return embedLink
      
    } catch{
      return "Not Found"
    }
    
  })

}
  
client.login(discordVars.TOKEN)

module.exports = { getDiscordLink }