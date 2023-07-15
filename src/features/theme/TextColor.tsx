import React from 'react'
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import { ColorPicker, useColor } from 'react-color-palette'


const TextColor: React.FC = ()=> {

    const [color, setColor] = useColor("hex", "#121212");
    const colour = color.hex;

  return (

    
    <Popover.Root>
    <Popover.Trigger asChild>
    
    <button className=' items-center justify-center flex w-full pt-1 pb-1 '>

      <div
        className="flex rounded-full items-center border-none w-[33px] h-[33px]" aria-label="Update dimensions"
        style={
            {
                backgroundColor: colour,
            }
        }
        >

      </div>
      </button>
    </Popover.Trigger>
 
      <Popover.Content

       sideOffset={4}
     >

        <div className=''>

            <ColorPicker width={250} height={70} 
                color={color} 
                onChange={setColor} hideHEX hideHSV dark />
        </div>
    

      
        
        
        <Popover.Close
          className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7  "
          aria-label="Close"
        >
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    
  </Popover.Root>
   
  
  
  )
}

export default TextColor