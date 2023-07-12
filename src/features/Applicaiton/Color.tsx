import { motion } from 'framer-motion'
import React from 'react'
import { useAppDispatch } from '../../app/hooks';
import { changeTheme } from '../theme/themeSlice';
import { changeBackground } from '../background/backgroundSlice';
import { store } from '../../app/store'
import * as ContextMenu from '@radix-ui/react-context-menu';
import { deleteColorFromDatabase } from '../../app/handlingDatabase';
import { changeViewBackground } from '../viewBackground/viewBackgroundSlice';
interface Props {
    id: string,
    delay: number,
    deleteItem: (id: string) => void
}
const Color: React.FC<Props> = ({ id, delay, deleteItem }) => {
    const dispatch = useAppDispatch();
    const currentState = store.getState().theme
    const viewFullSize = () => {
        dispatch(changeViewBackground({
            active: true,
            type: "color",
            value: String(id),
        }))
    }
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger className="ContextMenuTrigger">
                <motion.div
                onClick={viewFullSize}
                    whileHover={{
                        scale: (21 / 20),
                        x: "0.5rem",
                        y: (21 / 20) / 2 * 0.5 + "rem",
                    }}
                    transition={{
                        duration: 0.5,
                        ease: 'easeInOut',
                    }}
                    style={{
                        backgroundColor: `${id}`,
                        height: "14rem",
                        width: '20rem',
                        display: 'inline-block',
                        flex: "0 0 auto",
                        margin: '0 0.5rem',
                        overflow: "visible"
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
                                backgroundType: 'color',
                                backgroundValue: String(id)
                            }))
                            dispatch(changeBackground({
                                type: 'color',
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
                            deleteColorFromDatabase(String(id))
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

export default Color