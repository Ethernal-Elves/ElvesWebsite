require('dotenv').config();
const Web3 = require("web3")
const infuraKey = process.env.REACT_APP_INFURA_KEY;
const prodenv = process.env.REACT_APP_PROD_ENV;
const {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} = require("ethereum-multicall");


const boneshardsContractAddress = "0x6c716bdb4289283e0ad1926c47b54412bd2c257b"
const etherOrcsRaidsContract = '0x47DC8e20C15f6deAA5cBFeAe6cf9946aCC89af59'
const contractAddress = prodenv ? "0x3abedba3052845ce3f57818032bfa747cded3fca" : "0x5e98f294a01b68e654e91a9925686065c2f42536"
const zugContract = prodenv ? "0xfee5f54e1070e7ed31be341e0a5b1e847f6a84ab" : "0xEB468b1c73E8D0159C163E9F0D95ABBD0B20b616"
const web3 = new Web3(new Web3.providers.HttpProvider(infuraKey))
const orcs = require('./orcs-abi.json')
const zug = require('./zug-abi.json')
const shards = require('./shard-abi.json')
const raidsAbi = require('./raids-abi.json')
const nftContract = new web3.eth.Contract(orcs.abi, contractAddress);
const ercContract = new web3.eth.Contract(zug.abi, zugContract);
const shardContract = new web3.eth.Contract(shards.abi, boneshardsContractAddress);
const raidsContract = new web3.eth.Contract(raidsAbi.abi, etherOrcsRaidsContract);
const etherscanKey = process.env.REACT_APP_ETHERSCAN_KEY;
var api = require('etherscan-api').init(etherscanKey);


export const sendToRaids = async({tokenid, place, double}) => {
 
let txData = nftContract.methods.sendToRaid(tokenid, place, double).encodeABI()
let tx = await txPayload(txData)
 
  //sign the transaction via Metamask
try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [tx],
      })
      
      
  return {
      success: true,
      status: (<>✅ Check out your transaction on <a target="_blank" href={`https://etherscan.io/tx/${txHash}`}>Etherscan</a> </>),
      txHash: txHash,
  
  }
} catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message + " Try reloading the page..."
  }

}

}



export const txReceipt = async ({ txHash, interval }) => {
  module.exports = function getTransactionReceiptMined(txHash, interval) {
    const self = this;
    const transactionReceiptAsync = function (resolve, reject) {
      self.getTransactionReceipt(txHash, (error, receipt) => {
        if (error) {
          reject(error);
        } else if (receipt == null) {
          setTimeout(
            () => transactionReceiptAsync(resolve, reject),
            interval ? interval : 500
          );
        } else {
          resolve(receipt);
        }
      });
    };

    if (Array.isArray(txHash)) {
      return Promise.all(
        txHash.map((oneTxHash) =>
          self.getTransactionReceiptMined(oneTxHash, interval)
        )
      );
    } else if (typeof txHash === 'string') {
      return new Promise(transactionReceiptAsync);
    } else {
      throw new Error('Invalid Type: ' + txHash);
    }
  };
};


const multiCallOrcs = async (multicallArray)=>{
  
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
  const contractCallContext: ContractCallContext[] = multicallArray
  const results: ContractCallResults = await multicall.call(contractCallContext);

  return results
}

export async function getUsername(owner){

  const init = {method: 'GET', headers: { }}

  let osRequest 
  let osResponse 
  let username = null
if(owner){
  try{
    osRequest = await fetch(`https://api.opensea.io/api/v1/assets?owner=${owner}&order_direction=desc&offset=0&limit=1`, init);
    osResponse = await osRequest.json()
    username = osResponse.assets[0].owner.user.username
    }catch(e){console.log(e)}
  
    return(username)
}else{
  return(null)
}


}

export const calaculateActions = ({action, claimable, level, lvlProgress, tokenid})=>{

  let level2 = ((parseInt(lvlProgress) + (parseInt(claimable)))/1000).toFixed(1)
  let level01 = (level)

  let calcLevel

let activitymap = null
  switch(parseInt(action)) {
      case 1:
        activitymap = "Farming"
        calcLevel = level01
        break;
      case 2:
        activitymap = "Training"
        calcLevel = level2
        break;
      default:
        activitymap = "Idle"
        calcLevel = level01
    }

    return({calcLevel, activitymap})

}

export const lookupAllOrcs = async ({start, stop})=>{
  let loopStart = start
  let loopEnd = stop
  let array = []

 for(let i = loopStart; i <= loopEnd; i++){
   array.push(i)
 }

 let orcArry = await lookupMultipleOrcs({array})

return orcArry

}

export const lookUpMultipleRaid = async ({array})=>{

  let tempArr = []

  if(array){
  array.map((i, index)=>{
    var tx = {
      reference: 'EtherOrcs'+i.toString(),
      contractAddress: etherOrcsRaidsContract,
      abi: raidsAbi.abi,
      calls: [{ reference: 'campaignsCall'+i.toString(), methodName: 'campaigns', methodParameters: [i]}, 
      { reference: 'commandersCall'+i.toString(), methodName: 'commanders', methodParameters: [i]},
       
     ]
    };
    tempArr.push(tx);
  })
}

let results = await multiCallOrcs(tempArr)

return(results)



}

export const lookupMultipleOrcs = async ({array})=>{

 let raidResults = await lookUpMultipleRaid({array})
  let tempArr = []

  if(array){
  array.map((i, index)=>{
    var tx = {
      reference: 'EtherOrcs'+i.toString(),
      contractAddress: contractAddress,
      abi: orcs.abi,
      calls: [{ reference: 'orcsCall'+i.toString(), methodName: 'orcs', methodParameters: [i]},
      { reference: 'claimableCall'+i.toString(), methodName: 'claimable', methodParameters: [i]},
      { reference: 'activitiesCall'+i.toString(), methodName: 'activities', methodParameters: [i]},
      { reference: 'ownerOfCall'+i.toString(), methodName: 'ownerOf', methodParameters: [i]},
      { reference: 'tokenURI'+i.toString(), methodName: 'tokenURI', methodParameters: [i]},
     ]
    };
    tempArr.push(tx);
  })
}

let results = await multiCallOrcs(tempArr)

let orcObj 
let orcArry = []

array.forEach(i => {
  
  let campaignEnd = parseInt(raidResults.results[`EtherOrcs${i}`].callsReturnContext[0].returnValues[2].hex, 16)
  let campaignReward = parseInt(raidResults.results[`EtherOrcs${i}`].callsReturnContext[0].returnValues[3].hex, 16)
  let campaignOwner = raidResults.results[`EtherOrcs${i}`].callsReturnContext[1].returnValues[0]
  let campaignPlace = raidResults.results[`EtherOrcs${i}`].callsReturnContext[0].returnValues[0]

  let orcData = results.results[`EtherOrcs${i}`].callsReturnContext[0].returnValues
  let activity = results.results[`EtherOrcs${i}`].callsReturnContext[2].returnValues[2]
  let claimable = parseInt(results.results[`EtherOrcs${i}`].callsReturnContext[1].returnValues[0].hex, 16)

  let orcTokenData = results.results[`EtherOrcs${i}`].callsReturnContext[4].returnValues[0]
  var b 
  var orcTokenObj
  try {
    b = orcTokenData.split(",")
    orcTokenObj = JSON.parse(atob(b[1]))
    console.log(orcTokenObj)
  } catch (error) {
    orcTokenObj = {image: null, name: null, body: null, helm: null, mainhand: null, offhand: null, attributes: null}
  }
 

  let level =  orcData[4]
  let lvlProgress =  orcData[6]
  let action = activity
  let tokenid = i
  
const {calcLevel, activitymap} = calaculateActions({action, claimable, level, lvlProgress,tokenid })
let finalAction = activitymap
let actionIndex = results.results[`EtherOrcs${i}`].callsReturnContext[2].returnValues[2].toString()
let timestamp = Date.now()
let ownerAdd = results.results[`EtherOrcs${i}`].callsReturnContext[2].returnValues[0]
if(ownerAdd === "0x0000000000000000000000000000000000000000" || parseInt(activity) === 0 ){
  ownerAdd = results.results[`EtherOrcs${i}`].callsReturnContext[3].returnValues[0]
}
if (timestamp < campaignEnd*1000 && campaignOwner !== "0x0000000000000000000000000000000000000000") {
  ownerAdd = campaignOwner
  finalAction = "Raiding"
  actionIndex = "3"
}

orcObj = {
    owner: ownerAdd.toLowerCase(),
    tokenid: i,
    time: parseInt(results.results[`EtherOrcs${i}`].callsReturnContext[2].returnValues[1].hex,16),  
    action: actionIndex,
    actionString: finalAction,
    level:orcData[4], 
    calcLevel: calcLevel,
    claimable: claimable,
    campaignEnd: campaignEnd,
    campaignReward: campaignReward,
    campaignPlace: campaignPlace,
    image: orcTokenObj.image,
    name: orcTokenObj.name ? orcTokenObj.name : `Orc #${i}`,
    body: orcData[0],
    helm: orcData[1],
    mainhand: orcData[2],
    offhand: orcData[3],
    zugModifier: orcData[5], 
    attributes: orcTokenObj.attributes
  }

  orcArry.push(orcObj)
})

return orcArry

}

export async function getContractEvents(){

  const init = {method: 'GET', headers: { }}

  let osRequest 
  let osResponse = null


  try{
  osRequest = await fetch(`https://api.opensea.io/api/v1/events?asset_contract_address=0x3abedba3052845ce3f57818032bfa747cded3fca&only_opensea=false&offset=0&limit=20
  `, init);
  osResponse = await osRequest.json()
 
  }catch(e){console.log(e)}

  return(osResponse)

}

export const pillage = async({tokenid, place, tryHelm, tryMainhand, tryOffhand}) => {
  
  let txData 
  if(tokenid.length > 1){
    txData = nftContract.methods.pillageWithManyOrcs(tokenid, place, tryHelm, tryMainhand, tryOffhand).encodeABI()
    console.log("yes array")
  }else{
    txData = nftContract.methods.pillage(tokenid[0], place, tryHelm, tryMainhand, tryOffhand).encodeABI()
  }

  let tx = await txPayload(txData)
 
  //sign the transaction via Metamask
try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [tx],
      })
      
return {
      success: true,
      status: (<>✅ Check out your transaction on <a target="_blank" href={`https://etherscan.io/tx/${txHash}`}>Etherscan</a> </>),
      txHash: txHash,

  }
} catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message + " Try reloading the page..."
  }

}

}


const txPayload = async(txData) => {
const nonce = await web3.eth.getTransactionCount(window.ethereum.selectedAddress, 'latest'); //get latest nonce
  //the transaction
  const tx = {
    'from': window.ethereum.selectedAddress,
    'to': contractAddress,
    'nonce': nonce.toString(),
    'data': txData
  };

return(tx)

}

export const doAction = async(action, id) => {
  
 var txData;
  if(id.length > 1){
    txData = nftContract.methods.doActionWithManyOrcs(id, action).encodeABI()
    console.log("yes array")
  }else{
    txData = nftContract.methods.doAction(id, action).encodeABI()
  }

  let tx = await txPayload(txData)

 
  //sign the transaction via Metamask
try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [tx],
      })
      
  
      
  return {
      success: true,
      status: (<>✅ Check out your transaction on <a target="_blank" href={`https://etherscan.io/tx/${txHash}`}>Etherscan</a> </>),
      txHash: txHash
      

  }
} catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message + " Try reloading the page..."
  }

}

}



export const returnFromRaid = async(action, id) => {
  
let txData = nftContract.methods.returnFromRaid(id, action).encodeABI()
let tx = await txPayload(txData)
 
  
   //sign the transaction via Metamask
 try {
   const txHash = await window.ethereum
       .request({
           method: 'eth_sendTransaction',
           params: [tx],
       })
       
   
       
   return {
       success: true,
       status: (<>✅ Check out your transaction on <a target="_blank" href={`https://etherscan.io/tx/${txHash}`}>Etherscan</a> </>),
       txHash: txHash
       
 
   }
 } catch (error) {
   return {
       success: false,
       status: "😥 Something went wrong: " + error.message + " Try reloading the page..."
   }
 
 }
 
 }
 


  
export const mintNFT = async() => {
  
  const nonce = await web3.eth.getTransactionCount(window.ethereum.selectedAddress, 'latest'); //get latest nonce
 
  //the transaction
  const tx = {
    'from': window.ethereum.selectedAddress,
    'to': contractAddress,
    'nonce': nonce.toString(),
    'data': nftContract.methods.mint().encodeABI()
  };

 
  //sign the transaction via Metamask
try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [tx],
      })
      
  
      
  return {
      success: true,
      status: (<>✅ Check out your transaction on <a target="_blank" href={`https://etherscan.io/tx/${txHash}`}>Etherscan</a> </>),
      txHash: txHash
      

  }
} catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message + " Try reloading the page..."
  }

}

}




  
export const collectZug = async(Orcs) => {
  
let txData = nftContract.methods.claim(Orcs).encodeABI()
let tx = await txPayload(txData)
 
 
  //sign the transaction via Metamask
try {
  const txHash = await window.ethereum
      .request({
          method: 'eth_sendTransaction',
          params: [tx],
      })
        
      
  return {
      success: true,
      status: (<>✅ Check out your transaction on <a target="_blank" href={`https://etherscan.io/tx/${txHash}`}>Etherscan</a> </>),
      txHash: txHash
      

  }
} catch (error) {
  return {
      success: false,
      status: "😥 Something went wrong: " + error.message + " Try reloading the page..."
  }

}

}


export const approveZug = async(amount) => {
  
  let txData = ercContract.methods.approve(window.ethereum.selectedAddress, web3.utils.toWei(amount)).encodeABI()

  const nonce = await web3.eth.getTransactionCount(window.ethereum.selectedAddress, 'latest'); //get latest nonce
  //the transaction
  const tx = {
    'from': window.ethereum.selectedAddress,
    'to': zugContract,
    'nonce': nonce.toString(),
    'data': txData
  };

  
   
    //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [tx],
        })
          
        
    return {
        success: true,
        status: (<>✅ Check out your transaction on <a target="_blank" href={`https://etherscan.io/tx/${txHash}`}>Etherscan</a> </>),
        txHash: txHash
        
  
    }
  } catch (error) {
    return {
        success: false,
        status: "😥 Something went wrong: " + error.message + " Try reloading the page..."
    }
  
  }
  
  }



///////////OLD

export function getContract(){
    
    return {nftContract, ercContract, web3}
  }

export async function getContractPrice(){
  const res = await nftContract.methods.getPrice().call();  
  return web3.utils.fromWei(res)
}


export const getContractAddress = () => {
  return(contractAddress)
  }

export const tokensByOwner = async (address) => {
var supply = nftContract.methods.tokensByOwner(address).call();
return(supply)
}

export const ownerOf = async (token) => {
  var address = nftContract.methods.ownerOf(token).call();
  return(address)
  }

export const getTokenSupply = async () => {
  var supply = nftContract.methods.totalSupply().call();
  return(supply)
  }

  export const balanceOf = async (address) => {
    var zug = await ercContract.methods.balanceOf(address).call();
    var shard = await shardContract.methods.balanceOf(address)();
    let balances = {zug: zug, shard: shard}
    return(balances)
    }
  



export const getEthPrice = async () => {
  var price = api.stats.ethprice();
  return(price)
}

export const getGasPrice = async () => {
  const gasApi = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscanKey}`, {method: "GET"})
  const response = await gasApi.json()

  return(response)
}



export const getTxReceipt = async (txHash) => {
  var ret = api.proxy.eth_getTransactionReceipt(txHash); 
  return(ret)
}

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "Wallet connected...",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a rel="noreferrer" target="_blank" href={`https://metamask.app.link/dapp/hilarioushuskies.life/`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a rel="noreferrer" target="_blank" href={`https://metamask.app.link/dapp/hilarioushuskies.life/`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

