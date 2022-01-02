import {
    getContractEvents, getContract
  } from "./utils/interact.js";
  import { useState, useEffect, useRef } from "react";
  import { Button } from "react-bootstrap";
  import Orc from "./Orc";
import Title from "./Title.js";
import Loading from "./Loading.js";
import RecentTrades from "./RecentTrades.js";

  
  function OpenSea() {
  
  const [osEvents, setOSEvents] = useState("");
  const [osStats, setOsStats] = useState();
  const [isMetamask, setIsMetamask] = useState(true);
  const [gasPrice, setGasPrice] = useState(0);
  const [showOrc, setShowOrc] = useState(true);
  const [orcId, setOrcId] = useState(1);
  
  
  useEffect(async () => {
    let osStatsArray = []
    let osData = await getContractEvents()
    let osStats = await fetch("https://api.opensea.io/api/v1/collection/ether-orcs/stats")
    let osStatsJson = await osStats.json()
    
    for (const [key, value] of Object.entries(osStatsJson.stats)) {
      let title = key.replace(/_/g, " ")
      osStatsArray.push({title:title.toUpperCase(), value: value})
    }
    console.log(osData)
    setOsStats(osStatsArray)
    setOSEvents(osData)
    console.log(osData)
  
  },[])
  
/*

  
  */
  
  
    return (
        <>
{osEvents ? (
<div>
<Title text="Open Sea Activity"/><br/>
<div class="text-2xl font-bold flex flex-wrap mt-4">SALE STATS</div>  
<div class="p-2 mb-5 border-2">
<div class="flex flex-wrap">
{osStats &&
  osStats.map((stat)=>{
    return(
      <>

      <div class="w-1/3 pb-2">
      <div class="sans-serif"><span class="capitalize font-bold">{stat.title}</span>: {stat.value}</div>      
      </div>
      
      </>
    )
  })
}
</div>
</div>
<RecentTrades />

<div class="text-2xl font-bold flex flex-wrap ">RECENT EVENTS ON OPENSEA</div>  
<div class="flex flex-wrap">
{osEvents && osEvents.asset_events.map((event)=>{

  let d = new Date(event.created_date)
  d = d.toLocaleString()

return(<>
<div class="w-1/2 flex flex-wrap justify-left p-3">
<div><img width={150} src={event.asset.image_preview_url} /> </div>
  <div>  
  Event Type:
 <span class="capitalize font-semibold">{" "} {event.event_type}</span>
  {event.bid_amount && <div>Bid Amount: {event.bid_amount/1000000000000000000} ETH</div> }
  {event.ending_price && <div>Ending Price: {event.ending_price/1000000000000000000} ETH </div>} 
  <div>Orc #:{event.asset.token_id}</div>
  <div class="text-sm">
  Created at {d}
  </div>
  <div class="pt-3">
      <button onClick={(e) => {
                              e.preventDefault();
                              window.location.href=`https://opensea.io/assets/0x3abedba3052845ce3f57818032bfa747cded3fca/${event.asset.token_id}`}}>
                              
                              View on OS</button>

      </div>
      </div>
     
</div>



</>
)})}

</div>
</div>
) : (<Loading />)}
  </>
   );
  }
  
  export default OpenSea;
  

  

