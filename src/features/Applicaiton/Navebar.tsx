import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    selectTheme,
} from '../theme/themeSlice'
import { AnimatePresence, motion } from "framer-motion"
import Card from './card';
const Navebar: React.FC = () => {
    const theme = useAppSelector(selectTheme);
    let dispatch = useAppDispatch();
    const [navState, setNavState] = useState(0);
    return (
        <>
            <div
                className='fixed top-0 left-0  w-screen flex
            items-center justify-between px-1 z-50
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
                    <motion.div
                        className='fixed top-0 left-0 w-screen flex
                    items-center justify-center
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
                        initial={{ y: -150 }}
                        animate={{ y: "6.5vh" }}
                        exit={{ x: -100 }}
                    >
                        {
                            navState === 1 &&
                            <div className='text-white h-full flex flex-row flex-1 overflow-x-scroll no-scrollbar
                            ' >
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />

                            </div>
                        }
                        {
                            navState === 2 &&
                            <div className='text-white'>
                                awsbfffg

                            </div>
                        }


                    </motion.div>
                </AnimatePresence>

            }
        </>
    )
}

export default Navebar