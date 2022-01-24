import React from 'react';
import { useEffect, useMemo, useState } from "react";
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
import Title from './Title';
import { useMoralis } from "react-moralis";
import { CSVLink } from "react-csv";
require('dotenv').config();


const CodeContest = ({text, size}) => {

	const { Moralis, authenticate, isAuthenticated, user} = useMoralis();
	const [csvReport, setCsvReport] = useState([1,2,3])
	const [loading, setLoading] = useState(true)

	const getData = async () => {
		const ElvesWhiteList = Moralis.Object.extend("ElvesWhitelist");
		const query = new Moralis.Query(ElvesWhiteList);
		
		const results = await query.find();

		const headers = [
			{ label: "createdAt", key: "createdAt" },
			{ label: "roleIndex", key: "roleIndex" },
			{ label: "roleName", key: "roleName" },
			{ label: "username", key: "username" },
			{ label: "walletAddress", key: "walletAddress" }]

		alert("Successfully retrieved " + results.length + " ids.");
		let arrObj = []
// Do something with the returned Moralis.Object values
			for (let i = 0; i < results.length; i++) {

			const object = results[i];
			arrObj.push({
							roleIndex: object.get('roleIndex'),
							roleName: object.get('roleName'),
							username: object.get('username'),
							walletAddress: object.get('walletAddress'),
							createdAt: object.createdAt})
						}
			

				let csv = {data: arrObj,
				headers: headers,
				filename: 'Report.csv'}
				setCsvReport(csv) 
				setLoading(false)
				

				}


    
    return (
    
        <>

      
	


{!loading ? <CSVLink {...csvReport}>Export to CSV</CSVLink> : <button variant="primary" onClick={getData}>Get Whitelist</button>}



        </>         
      );
    };
    
    export default CodeContest;
    
    
    