const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening
const discord = require('./discord.js')

//Idiomatic expression in express to route and respond to a client request
app.get('/DiscordImageLinkGenerator', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.use(express.urlencoded({
  extended: true
}))

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`); 
});

app.post('/DiscordImageLinkGenerator/GeneratedLink', async (req, res) => {
  const imageLink = req.body.imageLink

  let embedLink = await discord.getDiscordLink(imageLink)
  
  res.send(`<html> <head>Discord Image Link</head><body><h3>${embedLink}</h3></body></html>`)
  res.end()
})