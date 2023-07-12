import React, { useEffect, useState } from 'react'
import { addGradient, getGradientList } from '../../app/handlingDatabase'
import * as Popover from '@radix-ui/react-popover';
import Gradient from './Gradient'
import { HiPlus } from 'react-icons/hi'
import { color, motion } from 'framer-motion'
import Themes from './Theme';
import { ColorPicker, useColor } from 'react-color-palette';
import "react-color-palette/lib/css/styles.css";

const GradientList: React.FC = () => {
    const [gradientList, setGradientList] = React.useState<IDBValidKey[]>([])
    const [loaded, setLoaded] = React.useState(false)
    useEffect(() => {
        const t = async () => {
            const list = await getGradientList()
            setGradientList(list
                // .slice(0, 4)
            )
            console.log(list)
        }
        t().then(() => {
            setLoaded(true)
        })
    }, [])
    const deleteItem = (id: IDBValidKey) => {
        setGradientList(gradientList.filter((item) => item !== id))
    }
    function hashCode(str:string) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32-bit integer
        }
        return hash;
    }
    const [gradient1, setGradient1] = useColor("hex", "#ff0000");
    const [gradient2, setGradient2] = useColor("hex", "#00ff00");
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
            {gradientList.map((gradientId, index) => {
                return (
                    <Gradient id={String(gradientId)}
                        key={hashCode(gradientId.toString())}
                        delay={index * 0.2}
                        deleteItem={deleteItem}
                    />
                )
            }
            )}
            {
                loaded &&
                (
                    <Popover.Root>
                        <motion.button
                            initial={{
                                scale: 0,
                            }}
                            animate={{
                                scale: 1,
                                transition: {
                                    duration: 0.2,
                                    delay: 0.2 * gradientList.length,
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
                            <Popover.Trigger>
                                <motion.div
                                    initial={{
                                        scale: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                        rotate: 90,
                                        transition: {
                                            duration: 0.2,
                                        }
                                    }}
                                    whileHover={{
                                        scale: 21 / 20,
                                        rotate: 180,
                                        transition: {
                                            duration: 0.2,
                                        }
                                    }}
                                    className='w-full h-full flex justify-center items-center'
                                >
                                    <HiPlus className='text-white text-9xl'
                                    />
                                </motion.div>

                            </Popover.Trigger>
                        </motion.button>
                        <Popover.Content className='rounded-xl 
                        '
                            style={{
                                backgroundImage: `linear-gradient(${gradient1.hex},${gradient2.hex})`,
                                height: '50vh',
                                width: '50vw',
                            }}
                        >
                            <div
                                className=' w-full h-full flex flex-col justify-center items-center py-4
                            '

                            >
                                <div className='flex flex-row justify-center items-center w-full h-full
                                '
                                >
                                    <div className='-translate-x-2'>

                                        <ColorPicker width={
                                            window.innerWidth > 450 ? 450 : window.innerWidth - 50
                                        } height={
                                            window.innerWidth > 450 ? 228 : (window.innerWidth - 50) / 2
                                        }
                                            color={gradient1}
                                            onChange={setGradient1} hideRGB hideHSV dark

                                        />
                                    </div>
                                    <div className='translate-x-2'>

                                        <ColorPicker width={
                                            window.innerWidth > 450 ? 450 : window.innerWidth - 50
                                        } height={
                                            window.innerWidth > 450 ? 228 : (window.innerWidth - 50) / 2
                                        }
                                            color={gradient2}
                                            onChange={setGradient2} hideHSV hideRGB dark />
                                    </div>
                                </div>
                                <Popover.Close className="PopoverClose" aria-label="Close">
                                    <button className=' rounded-xl px-4 py-2
                            '
                                        style={{
                                            background: "#010101",
                                            color: "#fff",


                                        }}
                                        onClick={async () => {
                                            addGradient(`${gradient1.hex}-${gradient2.hex}`)
                                            let f = true
                                            while (f) {
                                                let LIST = await getGradientList()
                                                if (LIST.length > gradientList.length) {
                                                    let diff = LIST.filter(x => !gradientList.includes(x));
                                                    setGradientList([...gradientList, ...diff])
                                                    f = false
                                                }
                                            }
                                        }}
                                    >
                                        Add
                                    </button>


                                </Popover.Close>
                            </div>

                        </Popover.Content>
                    </Popover.Root>

                )
            }
        </div>
    )
}

export default GradientList