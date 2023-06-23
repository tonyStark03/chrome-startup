import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    addNewBackground,
    selectBackground,
} from './backgroundSlice'

const Background: React.FC = () => {
    const background = useAppSelector(selectBackground);
    useEffect(() => {
        if (background.type === "color") {
            changeBackgroundColour(background.value);
        }
    }, [background]);
    console.log(background);
    const changeBackgroundColour = (hexValue: string) => {
        document.querySelector('.BACKGROUND')?.setAttribute('style', `background-color: ${hexValue};`)
        console.log('changeBackgroundColour');
    }
    return (
        <div className='BACKGROUND fixed top-0 left-0 w-full h-full -z-50'>

        </div >
    )
}

export { Background }

