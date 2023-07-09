import React from 'react'
import { deleteVideoFromDatabase, getLocalImage144p } from '../../app/handlingDatabase'
import { motion } from 'framer-motion'
import { useAppDispatch } from '../../app/hooks'
import { changeTheme } from '../theme/themeSlice'
import { changeBackground } from '../background/backgroundSlice'
import { store } from '../../app/store'
import * as ContextMenu from '@radix-ui/react-context-menu';

interface Props {
    id: IDBValidKey,
    delay: number,
    deleteItem: (id: IDBValidKey) => void
}
const Video: React.FC<Props> = ({ id, delay, deleteItem }) => {
    const [data, setData] = React.useState<string>('')
    const currentState = store.getState().theme
    React.useEffect(() => {
        const t = async () => {
            getLocalImage144p(String(id)).then((res: ArrayBuffer | null) => {
                if (res === null) return '';
                let typedArray = new Uint8Array(res);
                const dataURL = window.URL.createObjectURL(new Blob([typedArray]));
                setData(dataURL)
            })
        }
        t();
    }
        , [])
    const dispatch = useAppDispatch();
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger className="ContextMenuTrigger">

                <motion.div
                    initial={{
                        scale: 0,
                    }}
                    animate={{
                        scale: 1,
                        transition: {
                            delay,
                            duration: 0.2
                        }
                    }}
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
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Content className='text-white bg-gray-800 rounded-md p-2 
                '
                >
                    <ContextMenu.Item className="hover:bg-[#7C81E3] rounded-md px-1 py-1
                    ">
                        View
                    </ContextMenu.Item>


                    <ContextMenu.Item className={`${currentState.backgroundValue !== String(id) ?
                        "hover:bg-[#7C81E3]"
                        : "hover:cursor-not-allowed"} 
                    rounded-md px-1 py-1
                    `
                    }

                        onClick={() => {
                            if (currentState.backgroundValue === String(id)) {
                                return
                            }
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
                    >
                        Set as Background
                    </ContextMenu.Item>


                    <ContextMenu.Item className={`${currentState.backgroundValue !== String(id) ?
                        "hover:bg-[#7C81E3]"
                        : "hover:cursor-not-allowed"} 
                    rounded-md px-1 py-1
                    `
                    }

                        onClick={() => {
                            if (currentState.backgroundValue === String(id)) {
                                return
                            }
                            deleteVideoFromDatabase(String(id))
                            deleteItem(id)
                        }}
                    >
                        Delete
                    </ContextMenu.Item>

                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>


    )
}

export default Video