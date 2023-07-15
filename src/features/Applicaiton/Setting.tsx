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
        // bg hata diyo
        <div className='flex bg-black items-center justify-between h-full w-full  '>
            {/* left */}
            <div className=' h-full flex  justify-center  py-20
                '
                style={{
                    width: window.innerHeight * (8/100),
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
                    backgroundColor: theme.borderColor,
                    width: "1px"
                }} />
            </motion.div>
            {/* right */}
            <div className='h-full overflow-y-auto  no-scrollbar py-20
            '
            style={{
                width: window.innerWidth - window.innerHeight * (8/100),
            }}
            >

                {children}
            </div>
        </div>

    )
}

export default Setting