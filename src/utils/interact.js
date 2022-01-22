require('dotenv').config();
const Web3 = require("web3")
const infuraKey = process.env.REACT_APP_INFURA_KEY;
const prodenv = process.env.REACT_APP_PROD_ENV;
const {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} = require("ethereum-multicall");


const web3 = new Web3(new Web3.providers.HttpProvider(infuraKey))

const etherscanKey = process.env.REACT_APP_ETHERSCAN_KEY;
var api = require('etherscan-api').init(etherscanKey);




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

