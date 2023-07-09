import React, { useEffect } from 'react'
import { addLocalVideo, getLocalVideoList } from '../../app/handlingDatabase'
import Video from './Video'
import Image from './Image'
import { HiPlus } from 'react-icons/hi'
import { motion } from 'framer-motion'
const VideoList: React.FC = () => {
    const [videoList, setVideoList] = React.useState<IDBValidKey[]>([])
    useEffect(() => {
        const t = async () => {
            const list = await getLocalVideoList()
            setVideoList(list
                // .slice(0, 4)
            )
        }
        t();
    }, [])
    const [newimageList, setNewImageList] = React.useState<IDBValidKey[]>([])
    function hashCode(str: string) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32-bit integer
        }
        return hash;
    }
    const deleteItem = (id: IDBValidKey) => {
        setVideoList(videoList.filter((item) => item !== id))
    }
    const inputEl = React.useRef<HTMLInputElement>(null);
    return (
        <div className='w-full flex flex-row overflow-x-scroll  h-full no-scrollbar 
            '
            style={{
                scrollSnapAlign: 'start',
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                overflow: 'hidden',
            }}
        >
            {
                videoList.length + newimageList.length < 10 &&
                (
                    <>
                        <input
                            ref={inputEl}
                            type="file"
                            accept="video/*"
                            style={{
                                display: 'none'
                            }}
                            onChange={async (e) => {
                                addLocalVideo(e)
                                let f = true
                                while (f) {
                                    let LIST = await getLocalVideoList()
                                    if (LIST.length > videoList.length) {
                                        let diff = LIST.filter(element => !videoList.includes(element))
                                        let newdiff = diff.filter(element => !newimageList.includes(element))
                                        setVideoList([...newdiff, ...videoList,])
                                        f = false
                                    }
                                }
                            }}
                        ></input>
                        <motion.div
                            onClick={() => {
                                inputEl.current?.click()
                            }}
                            initial={{
                                scale: 0,
                            }}
                            animate={{
                                scale: 1,
                                transition: {
                                    duration: 0.2
                                }
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
                                background: 'rgba(255,255,255,0.1)',
                                height: "14rem",
                                width: '20rem',
                                display: 'inline-block',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: "0 0 auto",
                                margin: '0 0.5rem',
                            }}
                            className='w-full h-full'
                        >
                            <motion.div
                                initial={{
                                    scale: 0,
                                }}
                                animate={{
                                    scale: 1,
                                    rotate: 90,
                                    transition: {
                                        duration: 0.2
                                    }
                                }}
                                whileHover={{
                                    scale: 21 / 20,
                                    rotate: 180,
                                    transition: {
                                        duration: 0.2
                                    }
                                }}
                                className='w-full h-full flex justify-center items-center'
                            >
                                <HiPlus className='text-white text-9xl'
                                />
                            </motion.div>

                        </motion.div>
                    </>

                )
            }
            {videoList.map((imageId, index) => {
                return (
                    <Video id={imageId}
                        key={hashCode(imageId.toString())}
                        delay={index * 0.2}
                        deleteItem={deleteItem}
                    />
                )
            }
            )}
        </div>
    )
}

export default VideoList