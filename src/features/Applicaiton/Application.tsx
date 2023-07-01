import React, { useEffect, useState } from 'react'
import * as Separator from '@radix-ui/react-separator';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectTheme,
} from '../theme/themeSlice'
import Utility from '../Utility/Utility';

const Application: React.FC = () => {
    const theme = useAppSelector(selectTheme);
    return (
        <div className='flex items-center justify-between h-screen w-screen py-20 px-6'>
            {/* left */}
            <div className=' h-full w-2/6 flex items-center justify-center max-sm:hidden'>
                <Utility />
            </div>
            {/* seprator */}
            <Separator.Root decorative className=' w-2 h-5/6 rounded max-sm:hidden' style={{
                backgroundColor: theme.primaryColor,
            }} />
            {/* right */}
            <div className=' w-full h-full flex items-center justify-center'>
            </div>
        </div>
    )
}

export default Application