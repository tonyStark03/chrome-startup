import React , { useRef } from 'react'
import { selectTheme } from '../theme/themeSlice';
import { useAppSelector } from '../../app/hooks';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


interface props{
    disabled: boolean
    minValue: number
    maxValue: number
    initalValue: number
    divRefArray: React.MutableRefObject<HTMLDivElement>[]
    setValue: ()=>void
}

const Slidebar: React.FC<props>=({disabled, minValue, maxValue, initalValue,divRefArray })=> {

    const theme = useAppSelector(selectTheme);

    const DivOpacity = () => {
        for (let i = 0; i < divRefArray.length; i++) {
            divRefArray[i].current.style.opacity = "0.5"
        }
    }

    function valuetext(value: number) {
        return `${value}`;
      }

  return (
    
    <>

    
    <Box  className='max-w-full flex items-center justify-center h-screen'>
    <Slider
    sx={{backgroundColor: theme.primaryColor, color: theme.textColor, width: '80%'}}
    aria-label="number"
    // remove from here
    defaultValue={40}
    getAriaValueText={valuetext}
    valueLabelDisplay="on"
    step={10}
    marks
    min={10}
    max={100}
    // to here
    
    // defaultValue={initalValue}
    // getAriaValueText={valuetext}
    // valueLabelDisplay="on"
    // step={maxValue/minValue}
    // marks
    // min={minValue}
    // max={maxValue}
    disabled={disabled}
    onMouseDown={DivOpacity}
    ></Slider>
    </Box>
    

    </>
  );
}

export default Slidebar