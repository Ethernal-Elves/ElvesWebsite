import { useMoralis } from "react-moralis";
require('dotenv').config();
const Web3 = require("web3")
const infuraKey = "https://rinkeby.infura.io/v3/d24509aa081148318aade60945a8864b"
export const nft_market_place_address = "0xAF0c3501f008556162e7d9AE574060d51b703883"
const coordinator = "0xe51d78beDC04665f76F06E7BdB78ae92391378BB"
const bazaarContract = "0x9E834211892a3606521B440F4E9B0Ff761Dac3C6"
export const bazaarABI = require('./bazaar-abi.json')
const contractAddress = "0xb6f2ec50debdf249df074de4b20e76dceaf5939c"
export const zugContract = "0xEB468b1c73E8D0159C163E9F0D95ABBD0B20b616"
export const zug = require('./zug-abi.json')
export const nftcontract = "0x5e98f294a01b68e654e91a9925686065c2f42536"
export const web3 = new Web3(new Web3.providers.HttpProvider(infuraKey))
const ercContract = new web3.eth.Contract(zug.abi, zugContract);




export const approveZug = async(amount) => {
  
    let txData = ercContract.methods.approve(coordinator, web3.utils.toWei(amount)).encodeABI()
  
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
    
    }}
  
   export const closeOffering = async (offeringId, priceEncoded) =>{
        const encodedFunction = web3.eth.abi.encodeFunctionCall(
            {

                "inputs": [
                    {
    
                        "internalType": "bytes32",
                        "name": "_offeringId",
                        "type": "bytes32"
    
                    }
                ],
                "name": "closeOfferingWithZug",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
    
            }
    
        , [offeringId]);
        
        const transactionParameters = {
            to: nft_market_place_address,
            from: window.ethereum.selectedAddress,
       //     value: priceEncoded,
            data: encodedFunction
        };
        const txt = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters]
        });
        return txt
    }