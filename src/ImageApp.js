import { useState, useEffect } from "react";
import React, { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import { data, token1, token2, token3, token5, token6, token7, token8, token9, Token11, Token13, Token14, Token15, Token16, Token17, Token18  } from "./data";

function ImageApp() {

//const apiURI = "https://api.sheety.co/cdbe00a0eadb9d00b13bfd323a812783/inventory/inventory"

const tokenArray = [token1, token2, token3, token5, token6, token7, token8, token9, Token11, Token13, Token14, Token15, Token16, Token17, Token18]

const [textAreaSample, setTextArea] = useState(tokenArray[0])

const [race, setRace] = useState(1)
const [hair, setHair] = useState(1)  
const [weapons, setWeapons] = useState(1)  
const [accessoriesOne, setAccessoriesOne] = useState(1)  
const [accessoriesTwo, setAccessoriesTwo] = useState(1)  

const [raceImg, setRaceImg] = useState(null)
const [hairImg, setHairImg] = useState(null)  
const [weaponsImg, setWeaponsImg] = useState(null)  
const [accessoriesImgOne, setAccessoriesImgOne] = useState(null)  
const [accessoriesImgTwo, setAccessoriesImgTwo] = useState(null)  

const [showImage, setShowImage] = useState(false)  
const [showMetaImage, setShowMetaImage] = useState(false)  

const [tokenURIImage, setTOKENURIImage] = useState(null)
const [elfObject, setElfObject] = useState(null)
const [counter, setCounter] = useState(0)





const updateTextArea = () => {

  let _counter = counter + 1

  if(counter > tokenArray.length - 1) {
    _counter = 0
  }

  setTextArea(tokenArray[counter])
  setCounter(_counter)

}



const getMeta = async () => {

let b
let elfJson
  try {
    b = textAreaSample.split(",")
    elfJson = JSON.parse(atob(b[1]))
    console.log(elfJson)
    setElfObject(elfJson)
    setTOKENURIImage(elfJson.image)
  } catch (error) {
    console.log(error)
  }

  console.log(elfJson)
  setShowMetaImage(true)

}


const genImage = async () => {  


data.inventory.map(elf => {    
  if(elf.traitType === "Race" && elf.dnaCode === parseInt(race)){
    setRaceImg(elf.imageData)
  }
  
  if(elf.traitType === "Hair" && elf.dnaCode === parseInt(hair)){
    setHairImg(elf.imageData)
  }
  
  if(elf.traitType === "Weapons" && elf.dnaCode === parseInt(weapons)){
    setWeaponsImg(elf.imageData)
  }
  
  if(elf.traitType === "Accessories" && elf.dnaCode === parseInt(accessoriesOne)){
    setAccessoriesImgOne(elf.imageData)
  }

  if(elf.traitType === "Accessories" && elf.dnaCode === parseInt(accessoriesTwo)){
    setAccessoriesImgTwo(elf.imageData)
  }
  
  
  })

  setShowImage(true)

}
  


function GetAttributes({elfData}) {

  let attributesSection =  elfData.attributes.map((a, i)=>{
 
       return(<div key={elfData.name + i}>
       <div class="flex justify-between border-b-2">
       <div class="text-sm capitalize">{a['trait_type'] /*//fix this laer */}</div> 
       <div class="font-semibold text-sm">{a.value}</div>
       
       </div>  
       </div>)
       })
     
       return(attributesSection)
     }







return (
    <div class="p-10" style={{background: "#111111"}}>

      <h1>ART TWEAKING BEFFFYYYY</h1>

    <div class="flex flex-wrap">
      <div class="w-1/2">
     
      <div class="w-2/3 p-10 justify-between">
      {showMetaImage &&
      <>
      <p>{elfObject.name}</p>
      <img src={tokenURIImage} class="w-full h-64" />
      <p class="pt-4 text-xs">{elfObject.description}</p>
      <GetAttributes elfData={elfObject} />     
      <br/>
      </>}
      
      </div>
      </div>
      <div class="w-1/2">
        <p>Enter TOKEN URI Metadata here</p>
      <textarea value={textAreaSample} onChange={(e) => setTextArea(e.target.value)} id="text" style={{color: "black", width: "100%", height: "600px"}} />
      <button onClick={getMeta}>Get Meta</button>{"  "}
      <button onClick={updateTextArea}>Next</button>
      </div>
      
      </div>



      <div class="flex flex-wrap" >
      <div class="w-1/2">

      {showImage &&  
      <div class="mb-10" style={{imageRendering: "pixelated"}} class="p2">

          <svg id="elf" width={600} height={600} version="1.1" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            {parseInt(race) !== 0 &&  <image x="1" y="1" width="160" height="160" imageRendering="pixelated" preserveAspectRatio="xMidYMid" xlinkHref={`data:image/png;base64,${raceImg}`}/>}
            {parseInt(accessoriesImgOne) !== 0 && <image x="1" y="1" width="160" height="160" imageRendering="pixelated" preserveAspectRatio="xMidYMid" xlinkHref={`data:image/png;base64,${accessoriesImgOne}`}/>}
            {parseInt(hair) !== 0 && <image x="1" y="1" width="160" height="160" imageRendering="pixelated" preserveAspectRatio="xMidYMid" xlinkHref={`data:image/png;base64,${hairImg}`}/>}
            {parseInt(weapons) !== 0 && <image x="1" y="1" width="160" height="160" imageRendering="pixelated" preserveAspectRatio="xMidYMid" xlinkHref={`data:image/png;base64,${weaponsImg}`}/>}
            {parseInt(accessoriesImgTwo) !== 0 && <image x="1" y="1" width="160" height="160" imageRendering="pixelated" preserveAspectRatio="xMidYMid" xlinkHref={`data:image/png;base64,${accessoriesImgTwo}`}/>}
          </svg>


          </div>}





      </div>
      <div class="w-1/2">
      <div class="flex flex-wrap flex-col">
        Race:
      <input type="text" onChange={(e) => setRace(e.target.value)} />
      Accessories L2
      <input type="text" onChange={(e) => setAccessoriesOne(e.target.value)} />
      Hair:
      <input type="text" onChange={(e) => setHair(e.target.value)} />
      Weapons
      <input type="text" onChange={(e) => setWeapons(e.target.value)} />
      Accessories L5
      <input type="text" onChange={(e) => setAccessoriesTwo(e.target.value)} />
      
      <button onClick={genImage}>Generate</button>  
      <br></br>
      <button onClick={() => {
      toPng(document.getElementById('elf')).then(dataUrl => {
        const link = document.createElement('a');
        link.download = 'image.png';
        link.href = dataUrl;
        link.click();
      });
    }}>Download</button>

      </div>
      </div>


      </div>



<div class="flex flex-wrap">
{data.inventory.map(elf => {

    return(
    
        <div class="w-1/6">
    <p class="border-3 border-red-800 m-3 p-3">Index{elf.id} / {elf.traitType} : {elf.dnaCode}
    <img width={200} src={`data:image/png;base64,${elf.imageData}`}/>
    </p>

    </div>)
    
 })}
</div>

</div>
  )
}

export default ImageApp;

