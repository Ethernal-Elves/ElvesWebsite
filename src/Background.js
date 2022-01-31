//Background.js
import React from 'react';
import background from "./media/newbg.jpg"
const Background = ( { children } ) =>
{
    return (
       
        <body style={{background: "#111111"}}>
      
            {children}
        </body>
    )
}

export default Background;