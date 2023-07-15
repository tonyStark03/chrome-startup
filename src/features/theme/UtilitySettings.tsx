import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { changeTheme, selectTheme } from './themeSlice'
import { motion } from 'framer-motion';
import Switch from '../Components/Switch';
const UtilitySettings: React.FC = () => {
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();
    console.log(theme)
    const [isActive, setisActive] = useState<boolean>(theme.utilityIsActive)
    const [isDateActive, setisDateActive] = useState<boolean>(theme.utilityIsDateActive)
    const [isTimeActive, setisTimeActive] = useState<boolean>(theme.utilityIsTimeActive)
    useEffect(() => {
        console.log({
            isActive,
            isDateActive,
            isTimeActive,
            theme,
        })
        dispatch(changeTheme({
            ...theme,
            utilityIsActive: isActive,
            utilityIsDateActive: isDateActive,
            utilityIsTimeActive: isTimeActive
        }))
    }, [isActive,
        isDateActive,
        isTimeActive,
    ])

    return (
        <div className='w-full px-4 text-center py-4
        '
        >
            <div className=' text-5xl text-start font-bold py-2
            '>
                UtilitySettings</div>
            <div className='w-full px-40 flex justify-between text-4xl py-2 
            '>

                Enabled
                {/* switch */}
                <Switch state={isActive} setState={setisActive} />
            </div>
            <div className='w-full px-40 flex justify-between text-4xl py-2
            '>
                Show Time

                {/* switch */}
                <Switch state={isTimeActive} disabled={!isActive} setState={setisTimeActive} />
            </div>

            <div className='w-full px-40 flex justify-between text-4xl py-2
            '>
                Show Date
                {/* switch */}
                <Switch state={isDateActive} disabled={!isActive} setState={setisDateActive} />
            </div>

        </div>
    )
}

export default UtilitySettings