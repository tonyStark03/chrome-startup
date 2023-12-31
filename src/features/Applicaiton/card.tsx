import Person4Icon from "@mui/icons-material/Person4";
import { useEffect, useRef, useState } from "react";
import { AnimationControls, animate, motion, useAnimationControls, useMotionValue } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeNavbarState } from "./navbarSlice";
import { selectNavbar } from "./navbarSlice";
import React from "react";
import backgroundSlice from "../background/backgroundSlice";

interface Props {
    heading: string;
    subHeading: string;
    children: React.ReactNode
    navControls: AnimationControls
}

const Card: React.FC<Props> = ({ heading, subHeading, children,navControls }) => {
    const primaryColor = useAppSelector(state=>state.theme.primaryColor)
    const navbarDropdownColor = useAppSelector(state=>state.theme.navbarDropdownColor)
    const element = useRef<HTMLDivElement>
        (null);
    const [isHovering, setIsHovering] = useState(false);
    const dispatch = useAppDispatch();
    const controls = useAnimationControls();
    const [isMainScreen, setIsMainScreen] = useState(false);
    const mainScreenAnimation = useAnimationControls();
    const fadeAwayAnimation = useAnimationControls();
    const [flag, setFlag] = useState(true);
    useEffect(() => {
        console.log(isHovering)
        controls.start({
            y: 20,
        });
    }, []);
    const handleMouseOver = () => {
        setIsHovering(true);
        controls.start({
            y: 0,
        });
    };
    const handleMouseOut = () => {
        setIsHovering(false);
        controls.start({
            y: 20,
        });
    };
    return (
        <motion.div
            ref={element}
            style={{
                backgroundColor: isMainScreen? "rgb(0,0,0,0)" : "#010101",
                zIndex: 50,
            }}
            animate={mainScreenAnimation}
            onClick={() => {
                if(!flag)return
                setFlag (false)
                mainScreenAnimation.start({
                    position: "absolute",
                    x: (element && element.current) ? element.current.getBoundingClientRect().x : 0,
                    y: "0",
                    transition: {
                        duration: 0,
                        ease: "easeOut",
                    },
                });
                fadeAwayAnimation.start({
                    opacity: 0,
                    transition: {
                        duration: 0.1,
                        ease: "easeOut",
                    },
                });
                mainScreenAnimation.start({
                    translateX: (element && element.current) ? -element?.current?.getBoundingClientRect().x : 0,
                    width: "100vw",
                    height: "93.5vh",
                    zIndex: 100,
                    transition: {
                        duration: 0.1,
                        ease: "easeOut",
                    },
                });
                mainScreenAnimation.start({
                    y:"56.5vh",
                    transition:{
                        delay:0.1,
                        duration:0,
                    }
                })
                navControls.start({
                    y: "-50vh",
                    transition: {
                        delay: 0.1,
                        duration: 0,
                    },
                });
            }}
        >
            {!isMainScreen && (

                <motion.div
                    onAnimationComplete={() => {
                        setIsMainScreen(true);
                    }}
                    className=" border-solid h-full justify-center pt-16 relative
                    "
                    onMouseEnter={handleMouseOver}
                    onMouseLeave={handleMouseOut}
                    style={{
                        aspectRatio: "4/5",
                        backgroundColor: primaryColor,
                        backgroundImage: `linear-gradient(${navbarDropdownColor},${navbarDropdownColor})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPositionY: !isHovering ? "0" : `-${element && element.current ? element.current.clientHeight + 10 : 1}px`,
                        transition: "all .1s ease-in",
                    }}
                    animate={fadeAwayAnimation}
                >
                    <Person4Icon
                        className="border-solid rounded-lg w-25 p-3 h-25 bg-black 
                "
                        style={{
                            aspectRatio: "1/1",
                        }}
                    />
                    {/* EMPTY DIV TO INCLUDE SPACE BETWEEN ICON AND TEXT */}
                    <div
                        style={{
                            height: "20vh",
                        }}
                    ></div>
                    <div>
                        <motion.h1
                            animate={controls}
                            transition={{
                                duration: 0.1,
                                ease: "easeOut",
                            }}
                            className="text-2xl 
                "
                        >
                            {heading}
                        </motion.h1>

                        {isHovering && (
                            <div
                                className="pt-1 text-sm hover:top-6
                "
                            >
                                {subHeading}
                            </div>
                        )}
                    </div>
                </motion.div>
            )
            }
            {
                isMainScreen && (
                    children
                )
            }
        </motion.div >
    );
};
export default Card;
