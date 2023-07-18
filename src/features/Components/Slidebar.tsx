import React from 'react';
import { selectTheme } from '../theme/themeSlice';
import { useAppSelector } from '../../app/hooks';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface Props {
    disabled?: boolean;
    minValue: number;
    maxValue: number;
    initialValue: number;
    divRefArray?: React.MutableRefObject<HTMLDivElement>[];
    setValue: React.Dispatch<React.SetStateAction<number>>; // Add this prop
    step?: number;
}

const Slidebar: React.FC<Props> = ({ minValue, maxValue, initialValue, divRefArray, setValue, step }) => {
    const theme = useAppSelector(selectTheme);

    const DivOpacity = () => {
        if(!divRefArray)return
        for (let i = 0; i < divRefArray.length; i++) {
            divRefArray[i].current.style.opacity = '0.5';
        }
    };

    function valuetext(value: number, index: number) {
        return `${value}`;
    }

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    return (
        <>
            <Box className='max-w-full flex items-center justify-center'>
                <Slider
                    sx={{ color: theme.primaryColor, width: '100%' }}
                    aria-label="number"
                    valueLabelDisplay="auto"
                    valueLabelFormat={valuetext}
                    value={initialValue}
                    step={step ? step : 1}
                    min={minValue}
                    max={maxValue}
                    onMouseDown={() => console.log('mouse down')}
                    onMouseUp={() => console.log('mouse up')}
                    onChange={handleSliderChange}
                />
            </Box>
        </>
    );
};

export default Slidebar;