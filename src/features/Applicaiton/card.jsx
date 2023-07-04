import Person4Icon from '@mui/icons-material/Person4';
import { useState } from 'react';
import './card.css'
const Card=()=>{
    const [isHovering,setIsHovering]=useState(false)

    const handleMouseOver=()=>{
        setIsHovering(true)
    }
    const handleMouseOut=()=>{
        setIsHovering(false)
    }
    return(
    <>
          
        
        <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
           className=' border-solid w-full h-96 hover:bg-purple-400 justify-center pt-16'>
            <div>
                <Person4Icon className='border-solid rounded-lg w-25 p-3 h-25 bg-black' />
                <h1 className='container text-2xl pb-1 pt-36'>Card</h1>
            </div>
           
            {isHovering && (
                <>
            <div className='pt-1 text-sm hover:top-6'>blah blah blah blah</div>

                </>)}
            
            {/* </div> */}
                
        </div>

    </>
    )
    
}
export default Card;