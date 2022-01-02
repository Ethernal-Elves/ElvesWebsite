
import { db } from "../initFirebase";
import { getDatabase, ref, set, onValue, query, get,child, equalTo, orderByValue, push, orderByChild, limitToLast} from "firebase/database";

export const updateMoralisDb = async ({orc, orcs}) => {

  orcs.set("owner", orc.owner.toLowerCase())
  orcs.set("username", orc.username ? orc.username : null)
  orcs.set("action", orc.action)
  orcs.set("actionString", orc.actionString)
  orcs.set("tokenid", parseInt(orc.tokenid))
  orcs.set("claimable", orc.claimable)
  orcs.set("level", parseInt(orc.level))
  orcs.set("calcLevel", parseFloat(orc.calcLevel))
  orcs.set("time", orc.time)
  orcs.set("body", orc.body)
  orcs.set("helm", orc.helm)
  orcs.set("mainhand", orc.mainhand)
  orcs.set("offhand", orc.offhand)
  orcs.set("totalZug", (4 + parseInt(orc.zugModifier)))
  orcs.set("attributes", orc.attributes)
  orcs.set("campaignEnd", orc.campaignEnd)
  orcs.set("campaignReward", orc.campaignReward)
  orcs.set("campaignPlace", orc.campaignPlace)
  orcs.save()
  .then((orc) => {
    // Execute any logic that should take place after the object is saved.
    console.log('Object updated with objectId: ' + orc.id );
  }, (error) => {
    // Execute any logic that should take place if the save fails.
    // error is a Moralis.Error with an error code and message.
    console.log('Failed to create new object, with error code: ' + error.message);
  });
  
}


export const updateDatabase = async (orc) => {  

    const orcDataref = ref(db, 'etherorcsgui/orcs/' + orc.tokenid)
    
      await set(orcDataref, {
        owner: orc.owner.toLowerCase(),
        username: orc.username ? orc.username : null,
        action: orc.action,
        actionString: orc.actionString,
        tokenid: parseInt(orc.tokenid),
        claimable: orc.claimable,
        level: parseInt(orc.level),
        calcLevel: parseFloat(orc.calcLevel),
        time: orc.time,
        body: orc.body,
        helm: orc.helm,
        mainhand: orc.mainhand,
        offhand: orc.offhand,
        totalZug: (4 + parseInt(orc.zugModifier)),
        attributes: orc.attributes,
        campaignEnd: orc.campaignEnd,
        campaignReward: orc.campaignReward,
        campaignPlace: orc.campaignPlace,
  
      });   

      console.log(`Updated Orc #${orc.tokenid} metadats`)
  
  }

export const getMyOrcsObject = async (address) => {
  
  const myOrcQuery = query(ref(db, 'orcs'), orderByChild('owner'), equalTo(address.toLowerCase())) ///"0x25aBa46Dcb360902Ab8CA72cA8528F1da1D903d8"));
  console.log("2.", address, "3.", myOrcQuery)    

  let dataArry = []
    let tokenArr = []
    let status = []
  
    onValue(myOrcQuery, (snapshot) =>{
      if(snapshot.exists()){
        

        Object.entries(snapshot.val()).forEach(([key, value])=>{
        
          dataArry.push({tokenId:value.tokenid, claimable:value.claimable, action:value.action})         
          tokenArr.push(value.tokenid)      
        })
     
        status.push(`Found ${tokenArr.length} Orc(s) for ${address}... Loading!`)
        console.log("Found Orcs. Orc of them", address, dataArry, "Orcs held:", tokenArr)   
      
      }else{
        console.log("Got No Orcs. NOrc of them", address) 
        status.push(`Found not Orcs try looking them up to force a metadata refresh.`)
      }
      
            
            }, {onlyOnce: true}
            )
           
           
            
           return({orcs: dataArry, tokens:tokenArr, status: status} ) 
    
    };
    

export const getOrcfromDb = async () => {

const OrcDisplayRef = query(ref(db, 'orcs'), limitToLast(100));
let obj

    onValue(OrcDisplayRef, (snapshot) =>{

        obj = snapshot.val();
        
         
       })
       
  return(obj)
  }