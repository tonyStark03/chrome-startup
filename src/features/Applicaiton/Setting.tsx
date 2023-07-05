import React from 'react'
import * as Separator from '@radix-ui/react-separator';
import { selectTheme } from '../theme/themeSlice';
import { useAppSelector } from '../../app/hooks';
import { motion } from 'framer-motion';
import { IoMdArrowRoundBack } from 'react-icons/io';

import { useAppDispatch } from '../../app/hooks';
import { changeNavbarState } from './navbarSlice';
interface Props {
    children: React.ReactNode
}
const Setting: React.FC<Props> = ({ children }) => {
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();
    return (
        <div className='flex  items-center justify-between h-full w-full py-20 px-6'>
            {/* left */}
            <div className=' h-full flex  justify-center max-sm:hidden
                '
                style={{
                    width: "5vw",
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
                    width: "2px",
                }}
                animate={{
                    height: "100%",
                }}
                transition={{
                    duration: 0.1,
                }}
            >
                <Separator.Root decorative className='h-full w-full rounded' style={{
                    backgroundColor: theme.primaryColor,
                }} />
            </motion.div>
            {/* right */}
            <div className=' w-full h-full flex items-center justify-center'>
                {children}
            </div>
        </div>

    )
}

export default Setting