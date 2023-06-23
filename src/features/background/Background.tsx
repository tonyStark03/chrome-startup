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
        if (background.type === "gradient") {
            changeBackgroundGradient(background.value.split('-'));
        }

    }, [background]);
    console.log(background);
    const changeBackgroundColour = (hexValue: string) => {
        const backgroundEle = document.querySelector('.BACKGROUND');
        backgroundEle?.removeAttribute('style');
        backgroundEle?.setAttribute('style', `background-color: ${hexValue};`)
        console.log('changeBackgroundColour');
    }
    const changeBackgroundGradient = (gradientValue: string[]) => {
        const backgroundEle = document.querySelector('.BACKGROUND');
        backgroundEle?.removeAttribute('style');
        backgroundEle?.setAttribute('style', `background-image: linear-gradient(${gradientValue[0]}, ${gradientValue[1]});`)
        console.log('changeBackgroundGradient');
    }
    return (
        <div className='BACKGROUND fixed top-0 left-0 w-full h-full -z-50'>

        </div >
    )
}

export { Background }

