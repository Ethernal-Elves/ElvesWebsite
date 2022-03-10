import React from 'react';
import { useEffect, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";
import { CSVLink } from "react-csv";



const ExportGame = ({text, size}) => {

	const { Moralis, authenticate, isAuthenticated, user} = useMoralis();
	const [csvReport, setCsvReport] = useState([1,2,3])
	const [loading, setLoading] = useState(true)
	const [progress, setProgress] = useState(0)




	const exportData = async () => {
		
		const ElvesWhiteList = Moralis.Object.extend("Elves");
		const query = new Moralis.Query(ElvesWhiteList);
		let limit = 100

		//page through the results
		let results = []
		let hasMore = true
		let page = 1
		while (hasMore) {

			query.limit(limit);
			query.skip(limit * (page - 1));
			query.withCount();
			const response = await query.find();
			let currentIndex = limit * (page)
			currentIndex > response.count ? hasMore = false : hasMore = true
			page++
			setProgress(currentIndex / response.count * 100)
			
			console.log(hasMore, response)
			results = results.concat(response.results)
			
		}

		//const results = await query.find();


		const headers = [
			{ label: "token_id", key: "token_id" },
			{ label: "owner_of", key: "owner_of" },
			{ label: "status", key: "status" },
			{ label: "timestamp", key: "timestamp" },
			{ label: "action", key: "action" },
			{ label: "actionString", key: "actionString"},
			{ label: "level", key: "level"},
			{ label: "class", key: "class" },
			{ label: "inventory", key: "inventory"},
			{ label: "weapon", key: "weapon"},
			{ label: "weaponTier", key: "weaponTier" },
			{ label: "attack", key: "attack"},
			{ label: "accessories", key: "accessories"},
			{ label: "health", key: "health" },
			{ label: "chain", key: "chain"},
		]

		alert("Successfully retrieved " + results.length + " ids.");
		let arrObj = []
// Do something with the returned Moralis.Object values
			for (let i = 0; i < results.length; i++) {

				
	const object = results[i];
			arrObj.push({
				token_id: object.get('token_id'),
				owner_of: object.get('owner_of'),
				status: object.get('status'),
				timestamp: new Date(object.get('timestamp')*1000).toLocaleString(), //object.get('timestamp'),
				action: object.get('elf_action'),
				actionString: object.get('actionString'),				
				level: object.get('elf_level'),
				class: object.get('elf_class'),
				inventory: object.get('elf_inventory'),
				weapon: object.get('elf_weapon'),
				weaponTier: object.get('elf_weaponTier'),				
				attack: object.get('elf_ap'),
				accessories: object.get('elf_accessories'),
				health: object.get('elf_hp'),
				chain: object.get('chain'),
						})
							
						}

			

				let csv = {data: arrObj,
				headers: headers,
				filename: 'Report.csv'}
				setCsvReport(csv) 
				setLoading(false)
				

				}


    
    return (
    
        <>

      
	


{!loading && <CSVLink {...csvReport}>Export to CSV</CSVLink>}
{<button className="btn btn-blue" onClick={exportData}>Export Game</button>}

{progress.toFixed(0)}%


        </>         
      );
    };
    
    export default ExportGame;
    
    
    