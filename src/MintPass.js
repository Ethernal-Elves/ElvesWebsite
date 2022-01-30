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


  
const MintPass = () => {
	


    const [loading, setLoading] = useState(false)
	
	const { Moralis} = useMoralis();


  
    const [discordMeta, setDiscordMeta] = useState({name: null, server: null, roleIndex: null, roleName: null})
    const [loaded, setLoaded] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)

  
                         
  
const getWLcreds = async () => {
    
        setLoading(true)
		try {
         
            const {address} = await getCurrentWalletConnected()
            console.log(address)
         	const params =  {wallet: address}
         	let response = await Moralis.Cloud.run("getSigDatabase", params);
         
            console.log("This is the screenshot we want to see:", response)
            
            setDiscordMeta({
                            name: response.username, 
                            roleIndex: response.r, 
                            roleName: response.n, 
                            signature: response.s, 
                            wallet: response.w})
        
            
           response && setLoaded(true)                
           setLoading(false)

			
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
            setErrorMsg("Error. Please screenshot browser console and submit ticket on discord.")
		}
	

}
	
 
return loaded ? (
    
        <div class="bg-black p-5">
        {/* I'm not Sullof. No easter eggs here*/}
        <p>
            <Title text={`WELCOME ${discordMeta.name}`} /> <br/><br/>Our time is here. You are on the whitelist with the role <Title text={discordMeta.roleName} /></p>
        
        <div class="border-2 p-3">
        <div>Mint Credentials</div>

        <div class="break-all">
        <p>Role Index:{" "}
            <b>{discordMeta.roleIndex} </b> 
        </p>
        </div>
        
        <div class="break-all">
        <p>Signature:{" "}
           <b>{discordMeta.signature}</b>
        </p>
        </div>
    
        <div class="break-all">
        <p>Wallet:{" "}
            <b>{discordMeta.wallet} </b> 
        </p>
        </div>
        </div>
       
        <br />
        <p>Use these details to mint your whitelist allocation by clicking <a href={`https://app.ethernalelves.com/mint?wl=${discordMeta.roleIndex}&signature=${discordMeta.signature}&address=${discordMeta.wallet}`} rel={'noreferrer'} target={"_blank"}> here</a></p>
        <p>Pro tip: copy and paste these values as they are here into the mint GUI or the contract</p>
        
        </ div>         
      ) : (
          <>
          {errorMsg ? <p class="text-xl">{errorMsg}</p> : null}
          <p>
            Click on the button below to get your whitelist access credentials. You will need these to mint.  
        </p>
              <p>1. Connect Wallet <ConnectWallet /> </p>
              <br></br>
              <p>2. Get your signature <button onClick={getWLcreds}>Reveal my signature!</button></p>



          
          </>
      )
    };
    
    export default MintPass;
    
    
    