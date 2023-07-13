import React from 'react'
import "react-color-palette/lib/css/styles.css";
import TextColor from './TextColor';
import ChangeRadius from './ChangeRadius';


// MAIN BLOCK OF THEME 
const InsideTheme: React.FC= () => {

    

    return(
      <>
      <div className=' flex  w-1/5 min-w-max justify-evenly rounded shadow-[0_2px_10px] shadow-blackA7'>

        <TextColor /> 
        <ChangeRadius /> 
        <TextColor /> 
  
     

      </div>

      </>

        
    )
}
export default InsideTheme;