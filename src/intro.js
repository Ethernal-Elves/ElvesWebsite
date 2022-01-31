import React from "react";
import Title from "./Title";
import { SocialIcon } from "react-social-icons";


const Intro = () => {
        

return (
<>
<div class="flex mt-10">
  <div class="m-auto">
     <div class="text-3xl"> <Title text={"!Onward"} /> </div> 
       <p class="pt-2">EthernalElves is a collection of 6666 Sentinel Elves racing to awaken the Elders. With no IPFS or API, these Elves a 100% on-chain. Play EthernalElves to upgrade your abilities and grow your army. !onward
        </p>

                                    <div class="space-x-10 w-full">
      <SocialIcon url="https://twitter.com/EthernalElves" />Twitter
      <SocialIcon url="https://discord.gg/DNnaPnc6" />Discord
      <SocialIcon url="https://opensea.io/collection/ethernalelves" />Opensea
      <SocialIcon url="https://drive.google.com/file/d/1-zpCKyPiCpJycyslBVQIoZXhXBxqJ3cZ/view" />Whitepaper
      <SocialIcon url="https://drive.google.com/file/d/1j3guFoR8ygBNP7-4ipX4N07-mg63FEck/view" />Gameguide
 
      
      </div>
                                   


                                   

</div>                            
</div>
      
     </>          
  );
};

export default Intro;


