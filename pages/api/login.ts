const DISCORD_CLIENT_ID : string = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET : string = process.env.DISCORD_CLIENT_SECRET;
const port : number = process.env.PORT;

const { Client } = require('discord.js');


async function discordSignIn(code : string)
{
  const params = new URLSearchParams();
  params.append('client_id', DISCORD_CLIENT_ID);
  params.append('client_secret', DISCORD_CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', `http://localhost:${port}/api/login`); //todo hardcoded
  params.append('scope', 'identify');
  params.append('code', code);
  
  const response = await fetch('https://discord.com/api/oauth2/token', 
    { method: "POST", body: params });
  const JSONResponse = await response.json()
  return JSONResponse
}

async function getDiscordUser(accessToken : string) {
  const params = new URLSearchParams();
  params.append('Authorization', `Bearer ${accessToken}`);

  const response = await fetch('https://discord.com/api/oauth2/@me', 
    { method: "GET", headers: params });
  const JSONResponse = await response.json()
  return JSONResponse
}

export default async function handler(req, res) {
  const code : string = req.query.code
  const discordSessionData = await discordSignIn(code)
  const user = await getDiscordUser(discordSessionData.access_token)

  console.log('discord session data', discordSessionData)
  console.log('user data', user)
    
  res.status(200).json({ name: 'John Doe' })

}
  