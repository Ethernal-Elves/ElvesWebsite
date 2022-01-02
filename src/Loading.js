import orcky from "./media/orkyp.gif"
import Title from "./Title"

export const Loading = () => {

    return(
   
            <div>
                <div class="text-xl md:text-4xl flex">    
                <div>
                 <div>
                    <img width={300} style={{imageRendering: "pixelated"}} src={orcky} alt="loading"/>
                 </div>
                <div class="animate-pulse">
                <Title text="Loading..." />
                </div>                
                    
                </div>       
                </div>
            </div>

    
    )
}

export default Loading
