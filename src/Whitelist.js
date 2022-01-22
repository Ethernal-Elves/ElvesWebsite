import React from 'react';
import { useEffect, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";
import {getContract, getCurrentWalletConnected} from "./utils/interact.js";
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
  
const Whitelist = () => {
	
	const dev = false;
    const query = useQuery();
    const code = query.get("code");
	
	const { Moralis} = useMoralis();


    const discordLink = dev ? "https://discord.com/api/oauth2/authorize?client_id=926731918790258708&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fwhitelist&response_type=code&scope=identify%20guilds%20guilds.members.read" :
                              "https://discord.com/api/oauth2/authorize?client_id=926731918790258708&redirect_uri=https%3A%2F%2Fethernalelves.com%2Fwhitelist&response_type=code&scope=identify%20guilds%20guilds.members.read"
    
    const redirectURI = dev ? "http://localhost:3000/whitelist" : "https://ethernalelves.com/whitelist"

    const [discordMeta, setDiscordMeta] = useState({name: null, server: null, roleIndex: null, roleName: null})
    const [discordStatus, setDiscordStatus] = useState("")

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

           
            const {address} = await getCurrentWalletConnected()
			const params =  {wallet: address, oauthData: oauthData}
			const response = await Moralis.Cloud.run("signMessage", params);

            console.log(response)

            setDiscordMeta({
                            name: response.username, 
                            roleIndex: response.r, 
                            roleName: response.n, 
                            signature: response.s, 
                            wallet: response.w})


			
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}

}
	

return (
    
        <>
        <h1>
            Welcome {discordMeta.name}
        </h1>
		
        <p>{discordStatus}</p>
        <p>Your role:{discordMeta.roleName}</p>
        <p>Your custom signature:{discordMeta.signature}</p>
        <p>Your role Index:{discordMeta.roleIndex}</p>
        <p>Your role wallet:{discordMeta.wallet}</p>
     

        <button variant="primary" 
        onClick={(e) => {
            e.preventDefault();
            window.location.href=discordLink;
            }}
        >Authenticate with Discord. Make sure you'r wallet is connected first.</button>


<p>
    Click on the button below to get your whitelist spot. 
</p>

        
        </>         
      );
    };
    
    export default Whitelist;
    
    
    