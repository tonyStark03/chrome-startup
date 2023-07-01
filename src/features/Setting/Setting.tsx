import React, { useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectTheme,
    closeSetting,
} from '../theme/themeSlice'
const Setting: React.FC = () => {
    const theme = useAppSelector(selectTheme);
    let dispatch = useAppDispatch();
    // useRef to store if mouse pointer is inside the setting box
    const settingRef = useRef<boolean>(false);
    return (
        // This is a overlay on the application
        <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center
        '
            onClick={() => {
                if (settingRef.current === true) return;
                dispatch(closeSetting())
                console.log('setting')
            }}
        >
            {/* This is the setting box */}
            <div className='w-1/2 h-1/2 flex items-center justify-center z-30' style={{
                backgroundColor: theme.backgroundColor,
                borderRadius: parseInt(theme.borderRadius)
            }}
                onMouseEnter={() => {
                    settingRef.current = true;
                }}
                onMouseLeave={() => {
                    settingRef.current = false;
                }}
            >

            </div>
        </div>
    )
}

export default Setting