import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { changeTheme, selectTheme } from './themeSlice'
import { motion } from 'framer-motion';
import * as Popover from '@radix-ui/react-popover';
import { ColorPicker, useColor } from 'react-color-palette';

import Switch from '../Components/Switch';
import { changesettingsOpatcity } from '../Applicaiton/navbarSlice';
const UtilitySettings: React.FC = () => {
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();
    const [isActive, setisActive] = useState<boolean>(theme.utilityIsActive)
    const [isDateActive, setisDateActive] = useState<boolean>(theme.utilityIsDateActive)
    const [isTimeActive, setisTimeActive] = useState<boolean>(theme.utilityIsTimeActive)
    const [fontColor, setFontColor] = useColor("hex", theme.utilityFontColor);
    useEffect(() => {
        dispatch(changeTheme({
            ...theme,
            utilityIsActive: isActive,
            utilityIsDateActive: isDateActive,
            utilityIsTimeActive: isTimeActive,
            utilityFontColor: fontColor.hex,
        }))
    }, [isActive,
        isDateActive,
        isTimeActive,
        fontColor,
    ])

    return (
        <div className='w-full px-4 text-center py-4
        '
        >
            <div className=' text-4xl text-start font-bold py-2
            '>
                {/* UtilitySettings */}
                Utility Settings
            </div>
            <div className='w-full px-40 flex justify-between text-2xl py-2 
            '>

                Enabled
                {/* switch */}
                <Switch state={isActive} setState={setisActive} />
            </div>
            <div className='w-full px-40 flex justify-between text-2xl py-2
            '>
                Show Time

                {/* switch */}
                <Switch state={isTimeActive} disabled={!isActive} setState={setisTimeActive} />
            </div>

            <div className='w-full px-40 flex justify-between text-2xl py-2
            '>
                Show Date
                {/* switch */}
                <Switch state={isDateActive} disabled={!isActive} setState={setisDateActive} />
            </div>
            <div className='w-full px-40 flex justify-between text-2xl py-2
            '>
                Font Color
                {/* color picker */}
                <Popover.Root>
                    <Popover.Trigger className={`w-20 h-10 rounded-md ${isActive ? "" : "opacity-50"}`}
                    >
                        <div className='w-full h-full rounded-md'
                            style={{
                                backgroundColor: theme.utilityFontColor,
                            }}
                        >
                        </div>
                    </Popover.Trigger>
                    <Popover.Content>
                        <motion.div
                            onMouseDown={() => {
                                dispatch(changesettingsOpatcity(0))
                                console.log("mouse down")
                            }}
                            onMouseUp={() => {
                                dispatch(changesettingsOpatcity(1))
                                console.log("mouse up")
                            }}
                        >
                            {
                                isActive &&
                                <ColorPicker
                                    width={
                                        window.innerWidth > 450 ? 450 : window.innerWidth - 50
                                    } height={
                                        window.innerWidth > 450 ? 228 : (window.innerWidth - 50) / 2
                                    }
                                    color={fontColor}
                                    onChange={setFontColor} hideRGB hideHSV dark
                                />
                            }
                        </motion.div>
                    </Popover.Content>
                </Popover.Root>
            </div>

        </div>
    )
}

export default UtilitySettings