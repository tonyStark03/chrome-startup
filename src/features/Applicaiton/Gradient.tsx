import React from 'react'
import { useAppDispatch } from '../../app/hooks';
import { motion } from 'framer-motion';
import { store } from '../../app/store';
import { changeTheme } from '../theme/themeSlice';
import { changeBackground } from '../background/backgroundSlice';
interface Props {
    id: string,
}



const Gradient: React.FC<Props> = ({ id }) => {
    const dispatch = useAppDispatch();
    const currentState = store.getState().theme
    return (
        <motion.div
            onClick={() => {
                dispatch(changeTheme({
                    ...currentState,
                    backgroundType: 'gradient',
                    backgroundValue: String(id)
                }))
                dispatch(changeBackground({
                    type: 'gradient',
                    value: String(id)
                }))
            }}
            whileHover={{
                scale: (21 / 20),
                x: "0.5rem",
                y: (21 / 20) / 2 * 0.5 + "rem",
            }}
            transition={{
                duration: 0.5,
                ease: 'easeInOut',
            }}
            style={{
                backgroundImage: `linear-gradient(${id.split('-')[0]}, ${id.split('-')[1]})`,
                height: "14rem",
                width: '20rem',
                display: 'inline-block',
                flex: "0 0 auto",
                margin: '0 0.5rem',
                overflow: "visible"
            }}
            className='w-full h-full
            '
        >
        </motion.div>
    )
}

export default Gradient