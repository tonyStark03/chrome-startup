import React, { useState } from 'react'
import * as Separator from '@radix-ui/react-separator';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import themeSlice, {
    selectTheme,
} from '../theme/themeSlice'

const Time: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const theme = useAppSelector(selectTheme);
    setInterval(() => {
        setTime(new Date());
    }, 60 * 1000);
    console.count('Time')
    return (
        <>
            <strong className='text-9xl max-xl:text-8xl max-lg:text-7xl' style={{
                color: theme.textColor,
            }}>
                {time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:{time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}
            </strong>
        </>
    )
}
const Utility = () => {
    const theme = useAppSelector(selectTheme);
    return (
        <div className='flex flex-col items-center justify-center h-full w-full'>
            <Time />

            <Separator.Root decorative className=' w-5/6 h-1 ' />
            <Separator.Root decorative className=' w-5/6 h-0.5 rounded-xl' style={{
                backgroundColor: theme.textColor,
            }} />

        </div>
    )
}

export default Utility;