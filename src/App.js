import { useState, useEffect } from "react";
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import {getCurrentWalletConnected} from "./utils/interact.js";

import { Helmet } from "react-helmet";
import Nav from "./Nav"
import Footer from "./footer";
import Intro from "./intro";
import {app, analytics} from "./initFirebase.js";
import ImageApp from "./ImageApp.js";



const history = createBrowserHistory();

function App() {
  

  const [wallet, setWallet] = useState("")
  const [flip, setFlip] = useState(false)
  

  let husky ="0xCcB6D1e4ACec2373077Cb4A6151b1506F873a1a5"
  let beff = "0x3296D61C5E737F9847bA52267b1DeBB8Dbff139F"
  let adminWallet = [husky.toLowerCase(), beff.toLowerCase()]

  useEffect(async() => {
    const {address} = await getCurrentWalletConnected()
    setWallet(address)
    if(adminWallet.includes(address.toLowerCase())){
      setFlip(true)
    }

  }, [])

  
 return (
    <>
<Helmet>
    <title>Ethernal Elves</title>
      <meta name="Ethernal Elves" content="Ethernal Elves is a collection of 6666 Elves. With no IPFS or API, these Elves are part of the larger blockchain based role-playing game universe, 100% on-chain. Onward!" />
      <meta content="summary_large_image" property="twitter:card" />
      <meta content="Ethernal Elves" property="og:title" />
</Helmet>


<div class="sticky top-0">
<Nav />
</div>

<div class="max-w-full py-3 text-white">
  <div class="container mx-auto p-3">
    <div class="max-w-screen-xl mx-auto"> 


  <Router history={history}>
    <div class="min-h-screen"> 
      <div class="container mx-auto"> 

              <Switch>
              <Route path="/beff/">
                <ImageApp />
    
    
                </Route>
                    

                <Route path="/whitelist/">
                
                {/*<CodeContest  />    <Whitelist />    */}
                </Route>

     
                <Route path="/">   
                <Intro />       
              
                </Route>
         

              </Switch>


          
      </div>
      </div>
      </Router>

     

   
</div>

</div>
    </div>
    <Footer />


</>
)}

export default App;


