const Discord = require('discord.js')
const discordVars = require('./discord_vars.json')

const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.MessageContent] })

let linkChannel

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  linkChannel = await client.channels.cache.get(discordVars.CHANNELID)

})

async function getDiscordLink(imageLink){

  return await linkChannel.send({content: `Link: ${imageLink}`}).then(async sent => { // 'sent' is that message you just sent
    try{
      embedLink = await sent.embeds[0].data.thumbnail.proxy_url
      return embedLink = embedLink.replace(/images-ext-1.discordapp.net/,"media.discordapp.net")
      
    } catch{
      return "Not Found"
    }
    
  })

}
  
client.login(discordVars.TOKEN)

module.exports = { getDiscordLink }