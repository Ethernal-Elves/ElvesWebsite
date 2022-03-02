import React from "react";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>

            <div class="max-w-full py-3 text-white">

                <div class="container mx-auto p-3">

                    <div class="max-w-screen-xl mx-auto">     

                    

                             <div class="space-x-10 w-full pt-3">
                           
                        </div>
                 

                         <div class="pt-5">            
                       
        
                                <div>
                               <ul class="inline-flex space-x-5 list-outside pl-0">
                                    <li><a href="hhttps://etherscan.io/address/0xA351B769A01B445C04AA1b8E6275e03ec05C1E75#code">Verified Contract</a></li>
                                    <li><a href="https://opensea.io/collection/ethernalelves">Open Sea</a></li>
                                    <li><a href="https://drive.google.com/file/d/1-zpCKyPiCpJycyslBVQIoZXhXBxqJ3cZ/view">WP</a></li>
                                    <li><a href="https://drive.google.com/file/d/1j3guFoR8ygBNP7-4ipX4N07-mg63FEck/view">Game Guide</a></li>
                                    <SocialIcon url="https://twitter.com/EthernalElves" />
                            <SocialIcon url="https://discord.gg/DNnaPnc6" />
    
                                         
                            </ul>
                                <div class="pt-3">
                                    &copy; {currentYear}
                                    {" "}
                                 Ethernal Elves | {" "}All rights reserved. Use at Dapp your own risk.
                          
                                </div>
                                
                                
                                </div>
                                    
                                </div>
                                
                
                        

                            
                        </div>
                    </div>

            </div>
        </>
    );
};

export default Footer
