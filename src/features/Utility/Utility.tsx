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
    const getDate = () => {
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', "Oct", 'Nov', 'Dec'];
        let day = days[time.getDay()];
        let date = time.getDate();
        let month = months[time.getMonth()];
        return `${day}, ${date} ${month}`;
    }
    console.count('Time')
    return (
        <>
            <strong className='text-9xl max-xl:text-8xl max-lg:text-7xl' style={{
                color: theme.textColor,
                fontFamily: theme.fontFamily.split('+').join(' '),
            }}>
                {time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:{time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}
            </strong>
            <Separator.Root decorative className=' w-5/6 h-1 ' />
            <Separator.Root decorative className=' w-5/6 h-0.5 rounded-xl' style={{
                backgroundColor: theme.textColor,
            }} />
            <Separator.Root decorative className=' w-5/6 h-1 ' />
            {/* Date,Day */}
            <div className='flex items-center justify-center'>
                <strong className='text-2xl max-xl:text-xl max-lg:text-lg' style={{
                    color: theme.textColor,
                    fontFamily: theme.fontFamily.split('+').join(' '),
                }}>
                    {getDate()}

                </strong>
            </div>
        </>
    )
}
const Utility = () => {
    const theme = useAppSelector(selectTheme);
    return (
        <div className='flex flex-col items-center justify-center h-full w-full'>
            <Time />
        </div>
    )
}

export default Utility;