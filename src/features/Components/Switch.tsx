import { motion, useAnimation, useAnimationControls } from 'framer-motion'
import React, { useEffect } from 'react'
import { selectTheme } from '../theme/themeSlice';
import { useAppSelector } from '../../app/hooks';

interface props {
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
    disabled?: boolean
}

const Switch: React.FC<props> = ({ state, setState, disabled }) => {
    const theme = useAppSelector(selectTheme);
    const controls = useAnimationControls();
    const bgControls = useAnimation();

    const toggle = () => {
        if (disabled === true) return
        setState((prev) => !prev)
    }
    useEffect(() => {
        if (state) {
            controls.start({
                x: 40,
                transition: {
                    duration: 0.1,
                    ease: "easeOut",
                },
            });
            bgControls.start({
                backgroundColor: theme.primaryColor,
            })
        } else {
            controls.start({
                x: 0,
                transition: {
                    duration: 0.1,
                    ease: "easeOut",
                },
            });
            bgControls.start({
                backgroundColor: "rgb(156 163 175 / 1)"
            })
        }
    }, [state])
    return (
        <motion.div className='w-20 h-10  rounded-full transition-all duration-100 ease-in-out'
            onClick={toggle}
            animate={bgControls}
        >
            <motion.div className={`bg-white rounded-full  ${disabled === true ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                initial={{
                    scale: 0.9,
                }}
                style={{
                    backgroundColor: theme.primaryColor,
                    width: "50%",
                    height: "100%"
                }}
                drag="x"
                dragConstraints={{
                    left: disabled === true ? state ? 40 : 0 : 0,
                    right: disabled === true ? state ? 40 : 0 : 40,
                }}
                animate={controls}
                dragElastic={0.01}
                onDragEnd={(event, info) => {
                    if (disabled === true) return
                    if (info.velocity.x > 20) {
                        setState(true)
                    } else {
                        setState(false)
                    }
                }}
            >
            </motion.div>
        </motion.div>
    )
}

export default Switch