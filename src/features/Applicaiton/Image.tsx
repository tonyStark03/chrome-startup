import React, { useEffect } from 'react'
import { deleteImageFromDatabase, getLocalImage144p } from '../../app/handlingDatabase'
import { motion, useAnimationControls } from 'framer-motion'
import { store } from '../../app/store'
import { useAppDispatch } from '../../app/hooks'
import { changeTheme } from '../theme/themeSlice'
import { changeBackground } from '../background/backgroundSlice'
import * as ContextMenu from '@radix-ui/react-context-menu';
import { changeViewBackground } from '../viewBackground/viewBackgroundSlice'
interface Props {
    id: IDBValidKey,
    delay: number,
    deleteItem: (id: IDBValidKey) => void
}
const Image: React.FC<Props> = ({ id, delay, deleteItem }) => {
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
    const viewFullSize = () => {
        dispatch(changeViewBackground({
            active: true,
            type: "image",
            value: String(id),
        }))
    }
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
                    whileHover={{
                        scale: 21 / 20,
                        x: "0.5rem",
                        y: (21 / 20) / 2 * 0.5 + "rem",
                    }}
                    transition={{
                        duration: 0.5,
                        ease: 'easeInOut',
                    }}
                    onClick={viewFullSize}
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
                    "
                        onClick={viewFullSize}
                    >
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
                                backgroundType: 'image',
                                backgroundValue: String(id)
                            }))
                            dispatch(changeBackground({
                                type: 'image',
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
                            deleteImageFromDatabase(String(id))
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

export default Image