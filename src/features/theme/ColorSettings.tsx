import React, { useEffect, useState } from 'react'
import { changeTheme, selectTheme } from './themeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as Popover from '@radix-ui/react-popover';
import { ColorPicker, useColor } from 'react-color-palette';
import { changesettingsOpatcity } from '../Applicaiton/navbarSlice';
const ColorSettings: React.FC = () => {
    const theme = useAppSelector(selectTheme)
    const dispatch = useAppDispatch();
    const [primaryColor, setPrimaryColor] = useColor("hex", theme.primaryColor);
    const [backgroundColor, setBackgroundColor] = useColor("hex", theme.backgroundColor);
    const [navbarColor, setNavbarColor] = useColor("hex", theme.navbarColor);
    const [separatorColor, setSeparatorColor] = useColor("hex", theme.separatorColor);
    const [navbarDropdownColor, setNavbarDropdownColor] = useColor("hex", theme.navbarDropdownColor);

    useEffect(() => {
        dispatch(changeTheme({
            ...theme,
            primaryColor: primaryColor.hex,
            backgroundColor: backgroundColor.hex,
            navbarColor: navbarColor.hex,
            separatorColor: separatorColor.hex,
            navbarDropdownColor:navbarDropdownColor.hex,
        }))
    }, [primaryColor, backgroundColor, navbarColor, separatorColor, navbarDropdownColor])
    return (
        <div className='w-full px-4 text-center py-4 
        '
        >
            <div className=' text-4xl text-start  py-2 
            '>
                Color Settings</div>
            <div className='w-full px-40 flex justify-between text-2xl py-2
            '>
                Primary Color
                <Popover.Root>
                    <Popover.Trigger className='w-20 h-10 rounded-md'
                    >
                        <div className='w-full h-full rounded-md'
                            style={{
                                backgroundColor: theme.primaryColor,
                            }}
                        >
                        </div>
                    </Popover.Trigger>
                    <Popover.Content>
                        <ColorPicker width={
                            window.innerWidth > 450 ? 450 : window.innerWidth - 50
                        } height={
                            window.innerWidth > 450 ? 228 : (window.innerWidth - 50) / 2
                        }
                            color={primaryColor}
                            onChange={setPrimaryColor} hideRGB hideHSV dark

                        />
                    </Popover.Content>
                </Popover.Root>
            </div>
            <div className='w-full px-40 flex justify-between text-2xl py-2
            '>
                Background Color
                <Popover.Root>
                    <Popover.Trigger className='w-20 h-10 rounded-md'
                    >
                        <div className='w-full h-full rounded-md'
                            style={{
                                border: '1px solid black',
                                backgroundColor: theme.backgroundColor,
                            }}
                        >
                        </div>
                    </Popover.Trigger>
                    <Popover.Content>
                        <ColorPicker
                            width={
                                window.innerWidth > 450 ? 450 : window.innerWidth - 50
                            } height={
                                window.innerWidth > 450 ? 228 : (window.innerWidth - 50) / 2
                            }
                            color={backgroundColor}
                            onChange={setBackgroundColor} hideRGB hideHSV dark

                        />
                    </Popover.Content>
                </Popover.Root>

            </div>
            <div className='w-full px-40 flex justify-between text-2xl py-2
            '>
                NavBar Color
                <Popover.Root>
                    <Popover.Trigger className='w-20 h-10 rounded-md'
                    >
                        <div className='w-full h-full rounded-md'
                            style={{
                                backgroundColor: theme.navbarColor,
                            }}
                        >
                        </div>
                    </Popover.Trigger>
                    <Popover.Content>
                        <ColorPicker
                            width={
                                window.innerWidth > 450 ? 450 : window.innerWidth - 50
                            } height={
                                window.innerWidth > 450 ? 228 : (window.innerWidth - 50) / 2
                            }
                            color={navbarColor}
                            onChange={setNavbarColor} hideRGB hideHSV dark

                        />
                    </Popover.Content>
                </Popover.Root>

            </div>
            <div className='w-full px-40 flex justify-between text-2xl py-2
            '>
                Separator(Divider) Color
                <Popover.Root>
                    <Popover.Trigger className='w-20 h-10 rounded-md'
                    >
                        <div className='w-full h-full rounded-md'
                            style={{
                                backgroundColor: theme.separatorColor,
                            }}
                        >
                        </div>
                    </Popover.Trigger>
                    <Popover.Content
                        onMouseDown={() => {
                            dispatch(changesettingsOpatcity(0))
                            console.log("mouse down")
                        }}
                        onMouseUp={() => {
                            dispatch(changesettingsOpatcity(1))
                            console.log("mouse up")
                        }}
                    >
                        <ColorPicker
                            width={
                                window.innerWidth > 450 ? 450 : window.innerWidth - 50
                            } height={
                                window.innerWidth > 450 ? 228 : (window.innerWidth - 50) / 2
                            }
                            color={separatorColor}
                            onChange={setSeparatorColor} hideRGB hideHSV dark
                        />
                    </Popover.Content>
                </Popover.Root>

            </div><div className='w-full px-40 flex justify-between text-2xl py-2
            '>
                Navbar dropdown color
                <Popover.Root>
                    <Popover.Trigger className='w-20 h-10 rounded-md'
                    >
                        <div className='w-full h-full rounded-md'
                            style={{
                                backgroundColor: theme.navbarDropdownColor,
                            }}
                        >
                        </div>
                    </Popover.Trigger>
                    <Popover.Content
                    >
                        <ColorPicker
                            width={
                                window.innerWidth > 450 ? 450 : window.innerWidth - 50
                            } height={
                                window.innerWidth > 450 ? 228 : (window.innerWidth - 50) / 2
                            }
                            color={navbarDropdownColor}
                            onChange={setNavbarDropdownColor} hideRGB hideHSV dark
                        />
                    </Popover.Content>
                </Popover.Root>
            </div>
        </div>
    )
}

export default ColorSettings