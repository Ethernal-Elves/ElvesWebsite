import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>

            <div class="max-w-full py-3 text-white">

                <div class="container mx-auto p-3">
                    <div class="max-w-screen-xl mx-auto">                  
                         <div class="pt-5">            
                       
                                <div class="">     
                                <div>
                               <ul class="inline-flex space-x-5 list-outside pl-0">
                                    <li><a href="hhttps://etherscan.io/address/0xA351B769A01B445C04AA1b8E6275e03ec05C1E75#code">Verified Contract</a></li>
                                    <li><a href="https://opensea.io/collection/ethernalelves">Open Sea</a></li>
                                    <li><a href="https://docs.google.com/">WP</a></li>
                                         
                            </ul>
                                <div class="pt-3">
                                    &copy; {currentYear}
                                    {" "}
                                 Ethernal Elves | {" "}All rights reserved. Use at your own risk.
                          
                                </div>
                                
                                
                                </div>
                                    
                                </div>
                                
                     </div>
                         <div>


                       
                 
                            
                        </div>
                    </div>
                </div>
              <div>
             
            </div>
            </div>
        </>
    );
};

export default Footer
