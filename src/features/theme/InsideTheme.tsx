import React from 'react'
import "react-color-palette/lib/css/styles.css";
import TextColor from './TextColor';
import ChangeRadius from './ChangeRadius';
import UtilitySettings from './UtilitySettings';
import * as Separator from '@radix-ui/react-separator';
import FontSettings from './FontSettings';
import ColorSettings from './ColorSettings';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from './themeSlice';
import BookmarkIconSettings from './BookmarkIconSettings';
import { Background } from '../background/Background';

// MAIN BLOCK OF THEME 
const InsideTheme: React.FC = () => {
    const theme = useAppSelector(selectTheme)


    return (
        <>
            <div className=' flex flex-col items-center min-w-max rounded px-2
            '>
                <UtilitySettings />
                <Separator.Root className='bg-white w-11/12
                ' style={{
                        height: "1px",
                    }} />
                <FontSettings />
                <Separator.Root className='bg-white w-11/12
                ' style={{
                        height: "1px",
                    }} />
                <ColorSettings />
                <Separator.Root className='bg-white w-11/12
                ' style={{
                        height: "1px",
                    }} />
                <BookmarkIconSettings />
                <Separator.Root className='bg-white w-11/12
                ' style={{
                        height: "1px",
                    }} />
            </div>

        </>


    )
}
export default InsideTheme;