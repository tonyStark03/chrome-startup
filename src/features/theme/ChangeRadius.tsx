import React from 'react'
import * as Popover from '@radix-ui/react-popover';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTheme } from './themeSlice';


const ChangeRadius: React.FC = () => {
    const theme = useAppSelector(selectTheme)
    const dispatch = useAppDispatch();
    function valuetext(value: number) {
        return `${value}`;
    }

    return (
        <>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button className='  items-center justify-center flex w-full  pb-1 '>

                        <div
                            className="flex text-4xl items-center " aria-label="Update dimensions">

                            r
                        </div>
                    </button>
                </Popover.Trigger>
                <Popover.Anchor />
                <Popover.Portal>
                    <Popover.Content sideOffset={2}>


                        <Box className="" width={200}>

                            <Slider className='' style={{


                            }} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" getAriaValueText={valuetext} />
                        </Box>



                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </>
    )
}

export default ChangeRadius