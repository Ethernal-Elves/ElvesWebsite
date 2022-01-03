import React from 'react';
import { useEffect, useMemo, useState } from "react";
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
  require('dotenv').config();

function useQuery() {
const { search } = useLocation();
  
return useMemo(() => new URLSearchParams(search), [search]);
}
  
const Whitelist = ({text, size}) => {

    const query = useQuery();
    const code = query.get("code");

    const dev = true;

    const discordLink = dev ? "https://discord.com/api/oauth2/authorize?client_id=926731918790258708&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fwhitelist&response_type=code&scope=identify%20guilds%20guilds.members.read" :
                              "https://discord.com/api/oauth2/authorize?client_id=926731918790258708&redirect_uri=https%3A%2F%2Fwww.ethernalelves.com%2Fwhitelist&response_type=code&scope=identify%20guilds%20guilds.members.read"
    
    const redirectURI = dev ? "http://localhost:3000/whitelist" : "https://ethernalelves.com/whitelist"

    const [discordName, setDiscordName] = useState("")
    const [discordStatus, setDiscordStatus] = useState("")
    const [discordRole, setDiscordRole] = useState("")

    const clientId = "926731918790258708"
    const clientSecret = process.env.REACT_APP_DISCORD_CLIENTSECRET
                         
    useEffect(async () => {
        if(code){
            await getWL()
        }
    }, [code])

const getWL = async () => {
    if (code) {
		try {
			const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: redirectURI,
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
	
			const oauthData = await oauthResult.json();

          	const userResult = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			let userID = await userResult.json()

            setDiscordName(userID.username)


			const userGuildsResult = await fetch('https://discord.com/api/users/@me/guilds', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			let userGuilds = await userGuildsResult.json()

			for (const [key, value] of Object.entries(userGuilds)) {
				if(value.id.toString() === "914739959271944233"){
					setDiscordStatus("User is member of the Ethernal Elves Guild. Fetching server roles...")
				}			
				
			  }

			  const guildsRoles = await fetch('https://discord.com/api/users/@me/guilds/914739959271944233/member', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			let guildRoles = await guildsRoles.json()

			let roleIds = guildRoles.roles

			//let roleSentinelOg = "923088191353937940"
			//let roleOGWl = "923088235465437205"
			//let roleWl = "923088451887304704"

			const WLroles = {
				"sentinel"  : "923088191353937940",
				"whitelist"   : "923088451887304704",
				"ogwhitelist" : "923088235465437205"
			}

			let roleForMint
            let roleForMintName
		
				  roleIds.map((roleid) => {

					if(roleid === WLroles.whitelist){
						roleForMintName = "Whitelist"
                        roleForMint = 1
					}
                    if(roleid === WLroles.ogwhitelist){
						roleForMintName = "OG Whitelist"
                        roleForMint = 2
					}
                    if(roleid === WLroles.sentinel){
						roleForMintName = "SENTINEL OG Whitelist"
                        roleForMint = 3
					}

				  })

			

                  setDiscordRole(` User has ${roleForMintName} role.`)
			
			//console.log(userGuilds);

			
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}

}
	




    ///https://discord.com/api/oauth2/authorize?client_id=926731918790258708&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fwhitelist&response_type=code&scope=identify%20guilds%20guilds.members.read
   

    
    return (
    
        <>

      

        <h1>
            Welcome {discordName}
        </h1>

        <p>
        {discordStatus}
        </p>
        <p>
        {discordRole}
        </p>

        <button variant="primary" 
        onClick={(e) => {
            e.preventDefault();
            window.location.href=discordLink;
            }}
        >Authenticate with Discord</button>

<br></br>
<br></br>
<br></br>

<p>
    Click on the button below to get your whitelist spot. Clicking the button will trigger a transaction in the Ethernal Elves WL Contract. 
    Your discord role and wallet address will be recorded.
</p>
<button variant="primary" 
        onClick={(e) => {
            e.preventDefault();
            window.location.href=discordLink;
            }}
        >Reserve your spot on the WL</button>
        
        </>         
      );
    };
    
    export default Whitelist;
    
    
    