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
import Verify from "./Verify.js";
import Stats from "./stats.js";



const history = createBrowserHistory();

function App() {
  

  
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
                <Verify />
                {/*<CodeContest  />    <Whitelist />    */}
                </Route>

     
                <Route path="/">   
                <Intro />    
                <Stats />   
              
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


