import headerLogo from './media/ee.png'
import ConnectWallet from "./ConnectWallet"
const Nav = () => {
    
    return(
        <>
        <nav class="bg-black shadow-lg">
			<div class="max-w-screen mx-auto px-4">
				<div class="flex justify-between">
					<div class="flex space-x-5">
						<div>
		
							<a href="/" class="flex items-center py-4 px-2">
								<img src={headerLogo} width={120} alt="Logo" /> 
								
							</a>

						</div>
				
						<div class="hidden md:flex items-center space-x-1 font-bold">                        
							<a href="/" class="no-underline	py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300">ABOUT ETHERNAL ELVES</a>
							{/*<a href="/whitelist" class="no-underline py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">WHITELIST</a>*/}
							
                           
						</div>
					</div>
			
					<div class="hidden md:flex items-center space-x-3 ">
                    <div class="flex justify-end">
                        <ConnectWallet />
                    </div> 
					</div>
		
					<div class="md:hidden flex items-center">
					<div class="flex justify-end">
                        <ConnectWallet />
                    </div> 
					

					
					</div>
				</div>
			</div>
	

	
		</nav>
        </>
    )
}

export default Nav;