import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { IconContext } from "react-icons";
import {
    changeViewBackground,
    selectViewBackground
} from './viewBackgroundSlice'
import { motion, useAnimationControls } from 'framer-motion'
import { getLocalImage, getLocalVideo } from '../../app/handlingDatabase'
import { GrClose } from 'react-icons/gr'
import { changeBackground } from '../background/backgroundSlice';
import { changeTheme, selectTheme } from '../theme/themeSlice';
import zIndex from '@mui/material/styles/zIndex';

const ViewBackground: React.FC = () => {
    const theme = useAppSelector(selectTheme)
    const dispatch = useAppDispatch()
    const viewBackground = useAppSelector(selectViewBackground)
    const controls = useAnimationControls()
    function handleBackground() {
        if (viewBackground.type === 'color') return `linear-gradient(${viewBackground.value},${viewBackground.value})`
        if (viewBackground.type === 'gradient') return `linear-gradient(${viewBackground.value.split('-')[0]},${viewBackground.value.split('-')[1]})`
    }
    const imageRef = React.useRef<HTMLImageElement>(null)
    const videoRef = React.useRef<HTMLVideoElement>(null)
    useEffect(() => {
        let applica = document.querySelector("#root")
        applica?.classList.add("cursor-wait")
        if (!viewBackground.active) {
            controls.start({
                backdropFilter: 'blur(0px)',
                opacity: 0,
                zIndex: -100,
            })
            applica?.classList.remove("cursor-wait")
            return;
        }
        if (viewBackground.type === 'image') {
            getLocalImage(viewBackground.value).then((image) => {
                if (image === null) {
                    return;
                }
                let typedArray = new Uint8Array(image)
                const dataURL = window.URL.createObjectURL(new Blob([typedArray]))
                imageRef.current?.setAttribute('src', dataURL)
                controls.start({
                    backdropFilter: 'blur(10px)',
                    zIndex: 51,
                    opacity: 1,

                })

                applica?.classList.remove("cursor-wait")
            })
        } else if (viewBackground.type === 'video') {
            getLocalVideo(viewBackground.value).then((video) => {
                if (video === null) {
                    return;
                }
                let blob = new Blob([video], { type: 'video/mp4' })
                const dataURL = window.URL.createObjectURL(blob)
                videoRef.current?.setAttribute('src', dataURL)
                controls.start({
                    backdropFilter: 'blur(10px)',
                    zIndex: 51,
                    opacity: 1,
                })

                applica?.classList.remove("cursor-wait")
            })
        } else {
            controls.start({
                backdropFilter: 'blur(10px)',
                zIndex: 51,
                opacity: 1,
            })

            applica?.classList.remove("cursor-wait")
        }
    }, [viewBackground])

    return (
        <motion.div
            initial={{
                backdropFilter: 'blur(0px)',
                opacity: 0,
                zIndex: -100

            }}
            animate={controls}
            style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100%',
                zIndex: 51,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'black',
            }}
        >
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}>
                {
                    (viewBackground.type === 'color' || viewBackground.type === 'gradient') &&

                    <div style={{
                        width: '90%',
                        height: '90%',
                        backgroundImage: handleBackground(),
                        borderRadius: '10px',
                    }}></div>
                }
                {viewBackground.type === 'image' &&
                    <img
                        ref={imageRef}
                        alt='background'
                        style={{
                            width: '90%',
                            height: '90%',
                            objectFit: 'cover',
                            borderRadius: '10px',
                        }}
                    />
                }
                {
                    viewBackground.type === 'video' &&
                    <video
                        ref={videoRef}
                        style={{
                            width: '90%',
                            height: '90%',
                            objectFit: 'cover',
                            borderRadius: '10px',
                        }}
                        autoPlay
                        loop
                        muted
                    />
                }
                <motion.div className='absolute  py-1 text-white font-bold transition-all duration-300 cursor-pointer top-0 left-0 flex justify-center items-center rounded-full text-4xl
                    
                    '
                    onClick={() => {
                        dispatch(changeBackground({
                            type: viewBackground.type,
                            value: viewBackground.value,
                        }))
                        dispatch(changeTheme({
                            ...theme,
                            backgroundType: viewBackground.type,
                            backgroundValue: viewBackground.value,
                        }))
                        dispatch(changeViewBackground({
                            ...viewBackground,
                            active: false,
                        }))
                    }}
                    style={{
                        width: "76%",
                        height: "8.33%",
                        translateX: "calc(50vw - 50%)",
                        translateY: "calc(88vh - 50%)",
                        // borderRadius:"1000%"
                    }}
                    initial={{

                        backdropFilter: 'blur(20px)',
                    }}
                >

                    Set as Wallpaper
                </motion.div>
                <motion.div className='absolute top-0 left-0 cursor-pointer px-2 py-2

                    '
                    onClick={() => {
                        dispatch(changeViewBackground({
                            active: false,
                            type: "color",
                            value: "",
                        }))
                    }}
                    style={{
                        backdropFilter: 'blur(20px)',
                        translateX: "calc(90vw)",
                        translateY: "calc(10vh)",
                        aspectRatio: 1,
                        borderRadius: '50%',
                    }}
                >
                    <IconContext.Provider
                        value={{
                            color: "white",
                        }}

                    >
                        <div>
                            <GrClose />
                        </div>
                    </IconContext.Provider>
                </motion.div>
            </div>
        </motion.div>
    )
}


export default ViewBackground