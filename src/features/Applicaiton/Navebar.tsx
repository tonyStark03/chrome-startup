import { useAppSelector, useAppDispatch } from '../../app/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    selectTheme,
} from '../theme/themeSlice'
import { AnimatePresence, animate, easeInOut, motion, useAnimationControls } from "framer-motion"
import Card from './card';
import {
    selectNavbar,
    changeNavbarState
} from "./navbarSlice"
import { Opacity, WidthFull } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import ImageList from './ImageList';
import Setting from './Setting'
import HorizontalList from './HorizontalList';
import VideoList from './VideoList';
import ColorList from './ColorList';
import GradientList from './GradientList';
import Themes from './Theme';
import InsideTheme from '../theme/InsideTheme';
const Navebar: React.FC = () => {
    const theme = useAppSelector(selectTheme);
    let dispatch = useAppDispatch();
    const navState = useAppSelector(selectNavbar).state;
    const controls = useAnimationControls();
    useEffect(() => {
        if (navState === 0) return
        controls.start({
            y: "6.5vh",
            transition: {
                duration: 0.1,
                ease: easeInOut,
            }
        }
        )
    }, [navState])
    return (
        <>
            <div
                className='fixed top-0 left-0  w-screen flex
            items-center justify-between px-1 z-50
            '
                style={{
                    backgroundColor: theme.navbarColor,
                    height: "6.5vh",
                    // bottom border 1px with color:theme.borderColor
                    borderBottom: `1px solid ${theme.borderColor}`,
                }}
            >
                {/* left part */}
                <div className='flex flex-auto items-center justify-center '
                    style={{
                        fontSize: "160%",
                        fontWeight: "bold",
                    }}
                >
                    TITLE
                </div>
                {/* middlepart */}
                <div className='flex flex-auto items-center justify-center'>
                </div>
                {/* right part */}
                <div className='flex flex-auto items-center justify-end'>
                    <button className='mr-4 hover:text-gray-400 transition-all duration-300  px-2 
                '
                        onClick={() => {
                            navState === 1 ? dispatch(changeNavbarState(0)) : dispatch(changeNavbarState(1))
                        }}
                    >
                        Setting
                    </button>
                    <button className='mr-4 hover:text-gray-400 transition-all duration-300  px-2 
                '
                        onClick={() => {
                            navState === 2 ? dispatch(changeNavbarState(0)) : dispatch(changeNavbarState(2))
                        }}
                    >
                        FAQ
                    </button>
                </div>
            </div>
            {/* content of tabs */}
            {navState !== 0 &&
                // animate on exit

                <motion.div
                    className='fixed top-0 left-0 w-screen flex
                    items-center justify-center
                    '
                    style={{
                        backgroundColor: theme.navbarDropdownColor,
                        height: "50vh",
                        boxShadow: `0px 0px 20px 100vh rgba(0,0,0,0)`,
                        y: "-100%"
                    }}
                    transition={{
                        duration: 0.1,
                        delay: 0.1,
                        ease: "easeInOut",
                    }
                    }
                    animate={controls}
                // controls={ controls}
                >
                    {
                        navState === 1 &&
                        <div className=' h-full flex flex-row flex-1 overflow-x-scroll no-scrollbar
                            ' >
                            {/* BACKGORUND */}
                            <Card heading='Background' subHeading='Change your background' navControls={controls}>
                                <Setting>
                                    <div className='flex flex-col items-center w-full px-1
                                    '>
                                        <div className=' text-6xl mb-4 w-full justify-start flex px-1
                                        '>
                                            BACKGROUNDS
                                        </div>
                                        <div className=' text-2xl mb-4 w-full justify-start flex px-1
                                        '
                                        >
                                            Change your background
                                        </div>
                                    </div>

                                    <HorizontalList><ImageList /></HorizontalList>
                                    <div className='flex flex-col items-center w-full px-1
                                    '>
                                        <div className=' text-2xl mb-4 w-full justify-start flex px-1
                                        '>
                                            Wallpapers
                                        </div>
                                    </div>
                                    <HorizontalList><VideoList /></HorizontalList>
                                    <div className='flex flex-col items-center w-full px-1
                                    '>
                                        <div className=' text-2xl mb-4 w-full justify-start flex px-1
                                        '>
                                            LIVE Wallpapers
                                        </div>
                                    </div>
                                    <HorizontalList><GradientList /></HorizontalList>
                                    <div className='flex flex-col items-center w-full px-1
                                    '>
                                        <div className=' text-2xl mb-4 w-full justify-start flex px-1
                                        '>
                                            Gradient
                                        </div>
                                    </div>
                                    <HorizontalList><ColorList /></HorizontalList>
                                    <div className='flex flex-col items-center w-full px-1
                                    '>
                                        <div className=' text-2xl mb-4 w-full justify-start flex px-1
                                        '>
                                            Solid Color
                                        </div>
                                    </div>
                                </Setting></Card>
                            {/* THEME */}
                            <Card heading='Theme' subHeading='Change Font, Text Color etc.' navControls={controls}>
                                <Setting>
                                    <InsideTheme />
                                </Setting>
                            </Card>
                            <Card heading='Import/Export' subHeading='Import or Export your previous layouts' navControls={controls}><Setting>""</Setting></Card>

                        </div>
                    }
                    {
                        navState === 2 &&
                        <div className=''>
                            awsbfffg

                        </div>
                    }


                </motion.div>

            }
        </>
    )
}

export default Navebar