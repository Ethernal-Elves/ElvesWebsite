import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {getRENTokenSupply} from "./utils/interact"


export const sentinelClass = ["Druid", "Assassin", "Ranger"] 

export const actionString = ["unstaked", "staked", "campaign", "passive mode", "idle", "re-rolled weapon", "re-rolled item", "healing", "polygon", "bloodthirst", "synergize"]

const Stats = () => {

const [loading, setLoading] = useState(true);

const [gameStatus, setGameStatus] = useState(0);

const { Moralis } = useMoralis();
const [max, setMax] = useState(0);
const [tokenSupply, setTokenSupply] = useState(0);
const [init, setInit] = useState(0);
const [currentPrice, setCurrentPrice] = useState(0);
const [renSupply, setRenSupply] = useState(0);
const [ownerCount, setOwnerCount] = useState(0);
const [ownerTable, setOwnerTable] = useState([]);
const [levelDistribution, setLevelDistribution] = useState([]);
const [actionDistribution, setActionDistribution] = useState([]);
const [staked, setStaked] = useState([]);
const [contractRen, setContractRen] = useState([]);
const [polyContractRen, setPolyContractRen] = useState([]);



useEffect(() => {
    async function init() {


    await Moralis.enableWeb3();     
    const ownerCount = await Moralis.Cloud.run("getAllOwners")  
    let polyContractRen = await Moralis.Cloud.run("getPolyContractRen")
    let contractRen = await Moralis.Cloud.run("getContractRen")
    let actions = await Moralis.Cloud.run("getActions")
    let polyactions = await Moralis.Cloud.run("getPolyActions")
    let staked = await Moralis.Cloud.run("getStaked")

    let renSupplyValue = await getRENTokenSupply()
    setRenSupply(renSupplyValue/1e18)

    //121763124399999999990894 
    
    let levels = await Moralis.Cloud.run("levelDistribution")
    let levelTiers = []
      //sort levels by objectId
      levels.sort(function(a, b) {
        return a.objectId - b.objectId;
      });

     
     //count tokens if objectID less than 20
        let tokenCount = 0
        for (let i = 0; i < levels.length; i++) {
            if (levels[i].objectId < 20) {
                tokenCount += levels[i].tokens
            }
        }

        levelTiers.push(tokenCount)
        tokenCount = 0
     //count tokens if objectID less than 40 but higher than 20
        for (let i = 0; i < levels.length; i++) {
            if (levels[i].objectId < 40 && levels[i].objectId > 20) {
                tokenCount += levels[i].tokens 
            }
        }
        levelTiers.push(tokenCount)
        //count tokens if objectID less than 60 but higher than 40
        tokenCount = 0
        for (let i = 0; i < levels.length; i++) {
            if (levels[i].objectId < 60 && levels[i].objectId > 40) {
                tokenCount += levels[i].tokens 
            }
        }
        levelTiers.push(tokenCount)
        //count tokens if objectID less than 80 but higher than 60
        tokenCount = 0
        for (let i = 0; i < levels.length; i++) {
            if (levels[i].objectId < 80 && levels[i].objectId > 60) {
                tokenCount += levels[i].tokens 
            }
        }
        levelTiers.push(tokenCount)
        
        //count tokens if objectID less than 100 but higher than 80
        tokenCount = 0
        for (let i = 0; i < levels.length; i++) {
            if (levels[i].objectId < 101 && levels[i].objectId > 80) {
                tokenCount += levels[i].tokens 
            }
        }

        setLevelDistribution(levelTiers)
        setOwnerCount(ownerCount.length)
        setActionDistribution(actions)
        setStaked(staked)
        setContractRen(contractRen)
        setPolyContractRen(polyContractRen)
    
    setLoading(false);


    }


    init();
}, [])






return (
<>
<h3>HODLERS: {ownerCount && ownerCount}</h3>      

<h3>Staked in gameplay</h3>

        {staked && staked.map((campaign, index) => {
                        
                        return(
                            <>
                            <div key={index} className="flex text-sm">
                            {campaign.objectId}. {campaign.tokens} 
                             </div>
                            
                            </>
                        )
                    })}


<h3>$REN & CREDITS In Circulation</h3>
<div className="flex text-sm">
Ren Supply {!loading && renSupply.toFixed()}
</div>
{!loading && contractRen.map((ren, index) => {

let issued 

        polyContractRen.map((poly, index) => {
            if(poly.objectId === ren.objectId){
                issued = poly.sumOftx/1000000000000000000 + ren.sumOftx/1000000000000000000
            }
        })

        let label = ""
        label = ren.objectId ? "Burnt" : "Issued"

          return(
                    <>
                    <div key={index} className="flex text-sm">
                    {label} : {(issued).toFixed()} 
                     </div>
                    
                    </>
                )
            })}


             

<h3>Action Distribution</h3>
             {actionDistribution && actionDistribution.map((level, index) => {
               const percentage = level.tokens / 6666 * 100
               const text = actionString[parseInt(level.objectId)]
                               return (
                  <div key={index} className="flex">
                    <div>{text}: {level.tokens} : {percentage.toFixed(0)} %</div>
                   </div> )})}

<h3>Level distribution</h3>
             {levelDistribution && levelDistribution.map((level, index) => {
                return (
                  <div key={index} className="flex">
                    <div>Level Tier{index + 1}: {level}</div>
                   </div> )})}

 </>



  ) 
};

export default Stats;


