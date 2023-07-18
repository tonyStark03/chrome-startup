import React, { useEffect, useState } from 'react'
import { changeTheme, selectTheme } from './themeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as Popover from '@radix-ui/react-popover';
import { ColorPicker, useColor } from 'react-color-palette';
import Slidebar from '../Components/Slidebar';

const FontSettings: React.FC = () => {
    const theme = useAppSelector(selectTheme)
    const dispatch = useAppDispatch();
    const [fontFamily, setfontFamily] = useState<string>(theme.fontFamily)
    const [fontColor, setFontColor] = useColor("hex", theme.fontColor);
    const [fontWeight, setFontWeight] = useState<number>(theme.fontWeight)
    useEffect(() => {
        dispatch(changeTheme({
            ...theme,
            fontColor: fontColor.hex,
            fontWeight
        }))
    }, [fontColor,fontWeight])
    return (
        <div className='w-full px-4 text-center py-4
        '
        >
            <div className=' text-4xl text-start font-bold py-2
            '>
                Font Settings</div>
            <div className='w-full px-40 flex justify-between text-2xl py-2
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

                    className='w-auto text-black text-2xl font-bold
                ' />
            </div>
            <div className='w-full px-40 flex justify-between text-2xl py-2
            '>
                Font Weight
                {/* select */}
                <div className='h-full w-2/6'>
                    <Slidebar
                        minValue={100}
                        maxValue={900}
                        initialValue={fontWeight}
                        setValue={setFontWeight}
                        divRefArray={[]}
                    />
                </div>
            </div>
            <div className='w-full px-40 flex justify-between text-2xl py-2
            '>
                Font Color
                {/* color picker */}
                <Popover.Root>
                    <Popover.Trigger className='w-20 h-10 rounded-md'
                    >
                        <div className='w-full h-full rounded-md'
                            style={{
                                backgroundColor: theme.fontColor,
                            }}
                        >
                        </div>
                    </Popover.Trigger>
                    <Popover.Content>
                        <ColorPicker width={
                            window.innerWidth > 450 ? 450 : window.innerWidth - 50
                        } height={
                            window.innerWidth > 450 ? 228 : (window.innerWidth - 50) / 2
                        }
                            color={fontColor}
                            onChange={setFontColor} hideRGB hideHSV dark

                        />
                    </Popover.Content>
                </Popover.Root>
            </div>
        </div>
    )
}

export default FontSettings