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
                <Separator.Root className=' w-11/12
                ' style={{
                        height: "1px", backgroundColor: theme.separatorColor,
                    }} />
                <FontSettings />
                <Separator.Root className=' w-11/12
                ' style={{
                        height: "1px", backgroundColor: theme.separatorColor,
                    }} />
                <ColorSettings />
                <Separator.Root className=' w-11/12
                ' style={{
                        height: "1px", backgroundColor: theme.separatorColor,
                    }} />
                <BookmarkIconSettings />
                <Separator.Root className=' w-11/12
                ' style={{
                        height: "1px", backgroundColor: theme.separatorColor,
                    }} />
            </div>

        </>


    )
}
export default InsideTheme;