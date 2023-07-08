import React, { useEffect } from 'react'
import { getLocalImage144p } from '../../app/handlingDatabase'
import { motion, useAnimationControls } from 'framer-motion'
import { store } from '../../app/store'
import { useAppDispatch } from '../../app/hooks'
import { changeTheme } from '../theme/themeSlice'
import { changeBackground } from '../background/backgroundSlice'
interface Props {
    id: IDBValidKey,
}
const Image: React.FC<Props> = ({ id }) => {
    const [data, setData] = React.useState<string>('')
    const currentState = store.getState().theme
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        const t = async () => {
            const d = await getLocalImage144p(String(id)).then((res: ArrayBuffer) => {
                const typedArray = new Uint8Array(res);
                console.log(typedArray)
                const dataURL = window.URL.createObjectURL(new Blob([typedArray]));
                setData(dataURL);
            })

        }
        t();
    }
        , [])
    return (

        <motion.div
            initial={{
                scale: 0,
            }}
            animate={{
                scale: 1,
                transition: {
                    delay: 0.2,
                    duration: 0.2
                }
            }}
            onClick={() => {
                dispatch(changeTheme({
                    ...currentState,
                    backgroundType: 'image',
                    backgroundValue: String(id)
                }))
                dispatch(changeBackground({
                    type: 'image',
                    value: String(id)
                }))
            }}
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
                backgroundImage: `url(${data})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: "14rem",
                width: '20rem',
                display: 'inline-block',
                flex: "0 0 auto",
                margin: '0 0.5rem',
            }}
            className='w-full h-full'
        >
        </motion.div>



    )
}

export default Image