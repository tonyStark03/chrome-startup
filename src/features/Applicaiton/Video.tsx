import React from 'react'
import { getLocalVideo } from '../../app/handlingDatabase'
import { motion } from 'framer-motion'
import { useAppDispatch } from '../../app/hooks'
import { changeTheme } from '../theme/themeSlice'
import { changeBackground } from '../background/backgroundSlice'
import { store } from '../../app/store'
interface Props {
    id: IDBValidKey,
}
const Video: React.FC<Props> = ({ id }) => {
    const [data, setData] = React.useState<string>('')
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const currentState = store.getState().theme
    React.useEffect(() => {
        const t = async () => {
            const d = await getLocalVideo(id).then((res: ArrayBuffer | null) => {
                if (res === null) return '';
                let blob = new Blob([res], { type: 'video/mp4' });
                let videoBlobURL = URL.createObjectURL(blob);
                videoRef.current?.setAttribute('src', videoBlobURL);
            })

        }
        t();
        videoRef.current?.pause()
    }
        , [])
    const handleMouseEnter = () => {

        if (videoRef.current === null) return;
        var isPlaying = videoRef.current.currentTime > 0 && !videoRef.current.paused && !videoRef.current.ended
            && videoRef.current.readyState > videoRef.current.HAVE_CURRENT_DATA;

        if (!isPlaying) {
            videoRef.current?.play()
        }

    }
    const handleMouseLeave = () => {
        videoRef.current?.pause()
        if (videoRef.current === null) return;
        videoRef.current.currentTime = 0
    }
    const dispatch = useAppDispatch();
    return (
        <motion.video loop muted playsInline preload='auto'
            onClick={() => {
                dispatch(changeTheme({
                    ...currentState,
                    backgroundType: 'video',
                    backgroundValue: String(id)
                }))
                dispatch(changeBackground({
                    type: 'video',
                    value: String(id)
                }))
            }}
            ref={videoRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            src={`data:video/mp4;base64,${data}`}
            whileHover={{
                scale: 21 / 20,
                x: "0.5rem",
                y: (21 / 20) / 2 * 0.5 + "rem",
            }}
            transition={{
                duration: 0.5,
                ease: 'easeInOut',
            }}
            style={{
                height: "14rem",
                width: '20rem',
                display: 'inline-block',
                flex: "0 0 auto",
                margin: '0 0.5rem',
            }}
            className='w-full h-full'
        >
        </motion.video>
    )
}

export default Video