import React from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectTheme,
    openSetting,
    closeSetting,
} from '../theme/themeSlice'
import { RiSettingsFill } from 'react-icons/ri';
const Navebar: React.FC = () => {
    const theme = useAppSelector(selectTheme);
    let dispatch = useAppDispatch();
    let blur = parseInt(theme.navBlur);
    return (
        <div
            className='fixed top-0 left-0  w-screen flex
        items-center justify-between px-6'
            style={{
                backdropFilter: `blur(${blur}px)`,
                height: '10vh',
            }}
        >
            {/* left part */}
            <div className='flex items-center justify-center'>

                <RiSettingsFill className='text-3xl hover:cursor-pointer' style={{
                    color: theme.primaryColor,
                }}
                    onClick={() => {
                        dispatch(openSetting())
                        console.log('setting')
                    }
                    }
                />
            </div>
            {/* middlepart */}
            <div className='flex items-center justify-center'>
            </div>
            {/* right part */}
            <div className='flex items-center justify-center'>

            </div>
        </div>
    )
}

export default Navebar