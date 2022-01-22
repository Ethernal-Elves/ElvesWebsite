import React from 'react';
import Title from "./Title"
import { useEffect, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";
import {getContract, getCurrentWalletConnected} from "./utils/interact.js";
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
import ConnectWallet from "./ConnectWallet.js"

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
    const [loaded, setLoaded] = useState(false)

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
            setLoaded(true)                


			
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}

}
	
 
return loaded ? (
    
        <>
        {/* I'm not Sullof. No easter eggs here*/}
        <p>
            <Title text={`WELCOME ${discordMeta.name}`} />, you have been declared worthy by the Head of Sentinels. You are on the whitelist with the role {discordMeta.roleName}</p>
        <div class="break-all">
            <Title text="SIGNATURE" /> 
            <p>{discordMeta.signature}</p>
        </div>
        <div class="break-all">
            <Title text="ROLE INDEX" /> 
            <p>{discordMeta.roleIndex}</p>
        </div>
        <div class="break-all">
            <Title text="WALLET" /> 
            <p>{discordMeta.wallet}</p>
        </div>
        <br />
        <p>Keep these details safe, you will need them to mint your Sentinel Elf.</p>
        </>         
      ) : (
          <>
          <p>
            Click on the button below to get your whitelist access credentials. You will need these to mint.  
        </p>
              <p>1. Connect Wallet <ConnectWallet /> </p>
              <br></br>
              <p>2. Authenticate with discord <button variant="primary" 
        onClick={(e) => {
            e.preventDefault();
            window.location.href=discordLink;
            }}
        >Authenticate</button></p>



          
          </>
      )
    };
    
    export default Whitelist;
    
    
    