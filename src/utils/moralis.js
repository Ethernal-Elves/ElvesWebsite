const serverUrl = "https://btx7uykjbmv4.usemoralis.com:2053/server";
const appId = "9TpAN5WNVmzRhJ69bxadxgF2hHEdryurWxotPeBV";
const Moralis = require('moralis');
Moralis.start({ serverUrl, appId });
const web3 = Moralis.enableWeb3();