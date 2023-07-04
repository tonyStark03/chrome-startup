import React, { useState, useEffect } from 'react'
import * as Separator from '@radix-ui/react-separator';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import themeSlice, {
    selectTheme,
} from '../theme/themeSlice'
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
const selectTextColor = createSelector(
    (state: RootState) => state.theme
    , (theme) => theme.textColor
)
const UseDate = () => {
    const locale = 'en';
    const [today, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    const day = today.toLocaleDateString(locale, { weekday: 'short' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric' });



    return (
        <>

            <strong className='text-8xl max-xl:text-8xl max-lg:text-7xl' style={{
                color: 'white',
            }}>
                {time}
            </strong>
            <Separator.Root decorative className=' w-5/6 h-1 ' />

            <Separator.Root decorative className=' w-5/6 h-0.5 rounded-xl' style={{
                backgroundColor: 'white',
            }} />
            <div style={{
                color: 'white',
            }}>
                {date}
            </div>


        </>
    )
}
const Utility = () => {
    return (
        <div className='flex flex-col items-center justify-center h-full w-full'>
            <UseDate />
        </div>
    )
}

export default Utility;