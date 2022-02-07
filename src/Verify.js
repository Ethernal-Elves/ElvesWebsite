import React from 'react';
import Title from "./Title"
import { useEffect, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";
import {getCurrentWalletConnected} from "./utils/interact.js";
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
  
const Verify = () => {
	
	const dev = true;

    
    const query = useQuery();
    const code = query.get("code");
    const [loading, setLoading] = useState(false)
	
	const { Moralis} = useMoralis();


    const discordLink = dev ? "https://discord.com/api/oauth2/authorize?client_id=926731918790258708&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fwhitelist&response_type=code&scope=guilds.join" :
                              "https://discord.com/api/oauth2/authorize?client_id=926731918790258708&redirect_uri=https%3A%2F%2Fethernalelves.com%2Fwhitelist&response_type=code&scope=identify%20guilds%20guilds.members.read"
    
    const redirectURI = dev ? "http://localhost:3000/whitelist" : "https://ethernalelves.com/whitelist"

    const [discordMeta, setDiscordMeta] = useState({name: null, server: null, roleIndex: null, roleName: null})
    const [loaded, setLoaded] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)
    //THE SENTINELS = 937781337371324456
    const clientId = "926731918790258708"
    const clientSecret = process.env.REACT_APP_DISCORD_CLIENTSECRET

                         
    useEffect(async () => {
        if(code){
            await getWL()
        }
    }, [code])

const getWL = async () => {
    if (code) {
        setLoading(true)
		try {

            let oauthResult

            try{
                oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: redirectURI,
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
			});
            }catch(e){
                console.log(e)
                console.log("Error getting oauth token, trying proxy")
                oauthResult = await fetch('https://cors-proxy.huskies.workers.dev/corsproxy/?apiurl=https://discord.com/api/oauth2/token', {
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
                        'Access-Control-Allow-Origin': '*'
                    },
                });

            }
			
	
			const oauthData = oauthResult ? await oauthResult.json() : "error"

           
            const {address} = await getCurrentWalletConnected()
			const params =  {wallet: address, oauthData: oauthData, elvesCount:1}
			let response 

            console.log(params)

            const memmberAPI = 'https://discord.com/api/users/@me/guilds/914739959271944233/member'
            const headers = {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `${oauthData.token_type} ${oauthData.access_token}`
            }

            try{
                response = await fetch(memmberAPI, {
                    method: 'GET',
                    headers: headers
                })
            }catch(e){
                console.log(e)
                console.log("Error getting member data, trying proxy")
            }

            const discordId = await response.json()            
            console.log(discordId.user.name)
            let memberRoleAdd 
            console.log(headers)

            try{
                memberRoleAdd = await fetch(`https://discord.com/api/guilds/914739959271944233/members/${discordId.user.id}`, {
				method: 'PUT',
				body: {roles: ["937781337371324456"]},
				headers: headers,
			});
            }catch(e){
                console.log(e)
                console.log("Error getting oauth token, trying proxy")
              

            }

            console.log(await memberRoleAdd.json())

            ////
    /*        
            
Moralis.Cloud.define("authDiscord", async(request) => {
    const logger = Moralis.Cloud.getLogger();
    //get whitelist object from database
    
        const numberofElves = request.params.elvesCount;   
        const walletAddress = request.params.wallet;
          const oauthData =  request.params.oauthData
        
        const fetchResponse = await Moralis.Cloud.httpRequest({
        method: 'GET',
        url: 'https://discord.com/api/users/@me/guilds/914739959271944233/member',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': `${oauthData.token_type} ${oauthData.access_token}`
        }
      }).then(function(httpResponse) {
          
          let dataObj = httpResponse.data;
    
          dataObj = JSON.stringify(dataObj);
          dataObj = JSON.parse(dataObj);
          
          const roleIds = dataObj.roles
          
          await Moralis.Cloud.httpRequest({
        method: 'POST',
        url: 'https://discord.com/api/users/@me/guilds/914739959271944233/member',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'authorization': `${oauthData.token_type} ${oauthData.access_token}`
        }
      })
    
            
            
          const roles = {roleName:roleForMintName, roleIndex: roleForMint, username: dataObj.user.username, userId: dataObj.user.id}
          return roles;
          
      }, function(httpResponse) {
        logger.info('Request failed with response code ' + httpResponse.status);
      });
        
    
        return response;
      }
      
    });
    
*/
            console.log(response)

            console.log(loaded)
           response && setLoaded(true)                
           setLoading(false)

			
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
            setErrorMsg("Error. Please screenshot browser console and submit ticket on discord.")
		}
	}

}
	
 
return loaded ? (
    
        <div class="bg-black p-5">
        {/* I'm not Sullof. No easter eggs here*/}
        <Title title="Verify" />

        </ div>         
      ) : (
          <>
          {errorMsg ? <p class="text-xl">{errorMsg}</p> : null}
          <p>
            Click on the button below to get your whitelist access credentials. You will need these to mint.  
        </p>
              <p>1. Connect Wallet <ConnectWallet /> </p>
              <br></br>
              <p>2. Get your signature <button variant="primary" 
        onClick={(e) => {
            e.preventDefault();
            window.location.href=discordLink;
            }}
        >Authenticate with Discord</button></p>



          
          </>
      )
    };
    
    export default Verify;
    
    
    