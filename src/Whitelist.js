import {
    BrowserRouter as Router,
  Link,
  useLocation
  } from "react-router-dom";
import React from 'react';
import { useEffect, useMemo } from "react";
import { Button } from "react-bootstrap";

function useQuery() {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  
const Whitelist = ({text, size}) => {

    let query = useQuery();
    let code = query.get("code");

    
    let clientId = "926731918790258708"
    let clientSecret = "7OxmHzxwjrxF2nPmMqqdm_wProrNi-FP"

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
					redirect_uri: `http://localhost:3000/whitelist`,
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
	
			const oauthData = await oauthResult.json();
//			https://discord.com/api/guilds/914739959271944233/roles
// https://discord.com/api/users/@me/guilds
//		https://discord.com/api/v8/guilds/914739959271944233/members/@me	

///guilds/{guild.id}/members/{user.id}


			const userResult = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			let userID = await userResult.json()


			const userGuildsResult = await fetch('https://discord.com/api/users/@me/guilds', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			let userGuilds = await userGuildsResult.json()

			for (const [key, value] of Object.entries(userGuilds)) {
				if(value.id.toString() === "914739959271944233"){
					console.log("Member is part of elves discord")
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
		
				  roleIds.map((roleid) => {

					if(roleid === WLroles.whitelist){
						roleForMint = "WL"
					}else if(roleid === WLroles.ogwhitelist){
						roleForMint = "OGWL"
					}else if(roleid === WLroles.sentinel){
						roleForMint = "SENTINEL"
					}

				  })

			

	
			console.log(roleForMint);
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
        <div>
            lalalalal
        </div>

        <button variant="primary" href="https://discord.com/api/oauth2/authorize?client_id=926731918790258708&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fwhitelist&response_type=code&scope=identify%20guilds%20guilds.members.read">Primary</button>
        </>         
      );
    };
    
    export default Whitelist;
    
    
    