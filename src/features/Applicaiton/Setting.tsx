import React from 'react'
import * as Separator from '@radix-ui/react-separator';
import { selectTheme } from '../theme/themeSlice';
import { useAppSelector } from '../../app/hooks';
import { motion, useAnimationControls } from 'framer-motion';
import { IoMdArrowRoundBack } from 'react-icons/io';

import { useAppDispatch } from '../../app/hooks';
import { changeNavbarState, selectNavbar } from './navbarSlice';
interface Props {
    children: React.ReactNode
}
const Setting: React.FC<Props> = ({ children }) => {
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();
    const controls = useAnimationControls();
    const navaState = useAppSelector(selectNavbar)
    const hexToRGB = (hex: string, a: number) => {
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${a})`;
    }
    React.useEffect(() => {
        controls.start({
            background: hexToRGB(theme.backgroundColor, navaState.settingsOpatcity),
            // opacity: navaState.settingsOpatcity===0?0.2:1,
            transition: {
                duration: 0.2,
            }
        })
    }, [navaState.settingsOpatcity,theme.backgroundColor])
    return (
        <motion.div className='flex items-center justify-between h-full w-full  '
            initial={{
                background: hexToRGB(theme.backgroundColor, 1),
                opacity: 1,
            }}
            animate={controls}
        >
            {/* left */}
            <div className=' h-full flex  justify-center  py-20
                '
                style={{
                    width: window.innerHeight * (8 / 100),
                }}
            >

                <IoMdArrowRoundBack className='text-4xl text-black bg-white  '
                    style={{
                        aspectRatio: "1/1",
                        borderRadius: "50%",
                    }}
                    onClick={(e) => {
                        dispatch(changeNavbarState(0))
                    }}
                />
            </div>
            {/* seprator */}
            <motion.div
                initial={{
                    height: "0%",
                    width: "1px",
                }}
                animate={{
                    height: "100%",
                }}
                transition={{
                    duration: 0.1,
                }}
            >
                <Separator.Root decorative className='h-full  rounded' style={{
                    backgroundColor: theme.separatorColor,
                    width: "1px"
                }} />
            </motion.div>
            {/* right */}
            <div className='h-full overflow-y-auto  no-scrollbar py-20
            '
                style={{
                    width: window.innerWidth - window.innerHeight * (8 / 100),
                }}
            >

                {children}
            </div>
        </motion.div>

    )
}

export default Setting