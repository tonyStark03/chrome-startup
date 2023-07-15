import React, { useState } from 'react'
import { changeTheme, selectTheme } from './themeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const FontSettings: React.FC = () => {
    const theme = useAppSelector(selectTheme)
    const dispatch = useAppDispatch();
    const [fontSize, setfontSize] = useState<number>(theme.fontSize)
    const [fontFamily, setfontFamily] = useState<string>(theme.fontFamily)
    return (
        <div className='w-full px-4 text-center py-4
        '
        >
            <div className=' text-5xl text-start font-bold py-2
            '>
                FontSettings</div>
            <div className='w-full px-40 flex justify-between text-4xl py-2
            '>
                Font Size
                {/* slider */}
                <></>
            </div>
            <div className='w-full px-40 flex justify-between text-4xl py-2
            '>
                Font Family
                <input type="text"
                    value={fontFamily.split('+').join(' ')}
                    onChange={(e) => {
                        setfontFamily(e.target.value)
                        dispatch(changeTheme({
                            ...theme,
                            fontFamily: e.target.value.split(' ').join('+'),
                        }))
                    }}

                    className='w-auto text-black text-4xl font-bold
                ' />
            </div>
            <div className='w-full px-40 flex justify-between text-4xl py-2
            '>
                Font Weight
                {/* select */}
                <></>
            </div>
            <div className='w-full px-40 flex justify-between text-4xl py-2
            '>
                Font Color
                {/* color picker */}
                <></>
            </div>
        </div>
    )
}

export default FontSettings