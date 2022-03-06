import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {getRENTokenSupply} from "./utils/interact"
import logo from "./media/elf.svg"


const actionString = ["unstaked", "staked", "campaign", "passive mode", "idle", "re-rolled weapon", "re-rolled item", "healing", "polygon", "synergize", "bloodthirst"]

const Stats = () => {

const [loading, setLoading] = useState(true);

const { Moralis } = useMoralis();
const [renSupply, setRenSupply] = useState(0);
const [ownerCount, setOwnerCount] = useState(0);
const [levelDistribution, setLevelDistribution] = useState([]);
const [weaponTierDistribution, setWeaponTierDistribution] = useState([]);
const [actionDistribution, setActionDistribution] = useState([]);
const [inPolygon, setInPolygon] = useState([]);
const [staked, setStaked] = useState([]);
const [contractRen, setContractRen] = useState([]);
const [polyContractRen, setPolyContractRen] = useState([]);

//Ren Supply {!loading && renSupply.toFixed()}  

useEffect(() => {
    async function init() {


    await Moralis.enableWeb3();     
    const ownerCount = await Moralis.Cloud.run("getAllOwners")  
    let polyContractRen = await Moralis.Cloud.run("getPolyContractRen")
    let contractRen = await Moralis.Cloud.run("getContractRen")
    let actions = await Moralis.Cloud.run("getActions")
    
    let staked = await Moralis.Cloud.run("getStaked")
    
    let weaponTierDistribution = await Moralis.Cloud.run("weaponTierDistribution")
    let getPolygonCount = await Moralis.Cloud.run("getPolygonCount")
        


    weaponTierDistribution.sort(function(a, b) {
      return a.objectId - b.objectId;
    });



   // let renSupplyValue = await getRENTokenSupply()
    //setRenSupply(renSupplyValue/1e18)

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
        levelTiers.push(tokenCount)



        let actionUnstaked = 0
        let actionStaked = 0
        let actionCampaign = 0
        let actionPassive = 0
        let actionIdle = 0
        let actionRerollWeapon = 0
        let actionRerollItem = 0
        let actionHealing = 0
        let actionPolygon = 0
        let actionBloodthirst = 0
        let actionSynergize = 0


        actions.map(action => {

            let actionIndex = parseInt(action.objectId)

            if(actionIndex === 0) {
                actionIdle += action.tokens

            }
            if(actionIndex === 1) {
                actionIdle += action.tokens
            }
            if(actionIndex === 2) {
                actionCampaign += action.tokens
            }
            if(actionIndex === 3) {
                actionPassive += action.tokens
            }
            if(actionIndex === 4) {
                actionIdle += action.tokens
            }
            if(actionIndex === 5) {
                actionRerollWeapon += action.tokens
            }
            if(actionIndex === 6) {
                actionRerollItem += action.tokens
            }
            if(actionIndex === 7) {
                actionHealing += action.tokens
            }
            if(actionIndex === 8) {
                actionPolygon += action.tokens
            }
            if(actionIndex === 9) {
                actionBloodthirst += action.tokens
            }
            if(actionIndex === 10) {
                actionSynergize += action.tokens
            }

        })

        let actionArray = [{objectId: 2, tokens: actionCampaign}, {objectId: 3, tokens: actionPassive}, {objectId: 4, tokens: actionIdle}, {objectId: 5, tokens: actionRerollWeapon}, {objectId: 6, tokens: actionRerollItem}, {objectId: 7, tokens: actionHealing}, {objectId: 9, tokens: actionBloodthirst}, {objectId: 10, tokens: actionSynergize}]
        let polyCount = getPolygonCount.filter(poly => poly.objectId === "polygon")
       
        setActionDistribution(actionArray)
        setInPolygon(polyCount[0].tokens)
        setWeaponTierDistribution(weaponTierDistribution)
        setLevelDistribution(levelTiers)
        setOwnerCount(ownerCount.length)
        setStaked(staked)
        setContractRen(contractRen)
        setPolyContractRen(polyContractRen)
       
    
    setLoading(false);


    }


    init();
}, [])






return (
    <>
<div class="flex">
    <div class="w-full">
        <img src={logo} class="h-96" alt="logo" />
        <p class="pt-2">EthernalElves is a collection of 6666 Sentinel Elves racing to awaken the Elders. With no IPFS or API, these Elves a 100% on-chain. Play EthernalElves to upgrade your abilities and grow your army. !onward
        </p>

         
    
    
    </div>
</div>    
<div class="flex justify-between">
    <div class="w-1/4">
<h3>Gameplay Statistics</h3>

<div className="flex text-sm">Individual Holders {ownerCount && ownerCount} </div>
<div className="flex text-sm">Sentinels On L2: {inPolygon && inPolygon} </div>



        {staked && staked.map((campaign, index) => {
                        
                        return(
                            <>
                            <div key={index} className="flex text-sm">
                            {campaign.objectId}. {campaign.tokens} 
                             </div>
                            
                            </>
                        )
                    })}

<br/>
<br/>
<br/>
<h3>$REN & CREDITS In Circulation</h3>
<div className="flex text-sm">

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


</div>           
<div class="w-1/4">
<h3>Current Activity</h3>
             {actionDistribution && actionDistribution.map((level, index) => {
                     const text = actionString[parseInt(level.objectId)]
                               return (
                  <div key={index} className="flex">
                    <div>{text}: {level.tokens} </div>
                   </div> )})}
                   </div>

                   <div class="w-1/4">
<h3>Level Tier distribution</h3>
             {levelDistribution && levelDistribution.map((level, index) => {
                return (
                  <div key={index} className="flex">
                    <div>Level Tier{index + 1}: {level}</div>
                   </div> )})}
                   <br/>
<br/>
<br/>
                   <h3>Weapon Tier  distribution</h3>
             {weaponTierDistribution && weaponTierDistribution.map((weapon, index) => {
                return (
                  <div key={index} className="flex">
                    <div>Level Tier{weapon.objectId}: {weapon.tokens}</div>
                   </div> )})}
                   </div>

 </div>
</>


  ) 
};

export default Stats;



