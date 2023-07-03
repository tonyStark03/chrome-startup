import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectTheme,
} from '../theme/themeSlice'
import { AnimatePresence, motion } from "framer-motion"
const Navebar: React.FC = () => {
    const theme = useAppSelector(selectTheme);
    let dispatch = useAppDispatch();
    const [navState, setNavState] = useState(0);
    return (
        <>
            <div
                className='fixed top-0 left-0  w-screen flex
            items-center justify-between px-1  z-50
            '
                style={{
                    backgroundColor: "#010101",
                    height: "6.5vh",
                    // bottom border 1px with color:theme.borderColor
                    borderBottom: `1px solid ${theme.borderColor}`,
                }}
            >
                {/* left part */}
                <div className='flex flex-auto items-center justify-center'>

                </div>
                {/* middlepart */}
                <div className='flex flex-auto items-center justify-center'>
                </div>
                {/* right part */}
                <div className='flex flex-auto items-center justify-end'>
                    <button className='mr-4 hover:text-gray-400 transition-all duration-300 text-white px-2 
                '
                        onClick={() => {
                            navState === 1 ? setNavState(0) : setNavState(1)
                        }}
                    >
                        Setting
                    </button>
                    <button className='mr-4 hover:text-gray-400 transition-all duration-300 text-white px-2 
                '
                        onClick={() => {
                            navState === 2 ? setNavState(0) : setNavState(2)
                        }}
                    >
                        F/Q
                    </button>
                </div>
            </div>
            {/* content of tabs */}
            {navState !== 0 &&
                // animate on exit
                <AnimatePresence >
                    {/* make height 60vh */}
                    <motion.div
                        className='fixed top-0 left-0 w-screen flex
                    items-center justify-center px-1  z-40
                    '
                        style={{
                            backgroundColor: "#010101",
                            height: "50vh",
                        }}
                        // ease in 
                        transition={{
                            duration: 0.1,
                            ease: "easeInOut",
                        }
                        }
                        initial={{  y: -150 }}
                        animate={{  y: "6.5vh" }}
                        exit={{  x: -100 }}
                    >
                        {
                            navState === 1 &&
                            <div className='text-white'>
                                adfwdfsas
                            </div>
                        }
                        {
                            navState === 2 &&
                            <div className='text-white'>
                                adfwdfsas
                            </div>
                        }


                    </motion.div>
                </AnimatePresence>

            }
        </>
    )
}

export default Navebar