import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Background } from './features/background/Background';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { addLocalImage, addLocalVideo, getLocalImageList, storeThemeInLocalStorage } from './app/handlingDatabase';
import {
    changeBackground,
    selectBackground,
} from './features/background/backgroundSlice'
import {
    selectTheme, changeTheme
} from './features/theme/themeSlice'
import Application from './features/Applicaiton/Application';
import { getThemeFromLocalStorage } from './app/handlingDatabase'
const App = () => {
    let background = useAppSelector(selectBackground);
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    useEffect(() => {
        const t = async () => {
            const themeData = await getThemeFromLocalStorage();
            if (themeData === undefined) {
                dispatch(changeTheme(theme));
                // alert("themeData")
            } else {
                dispatch(changeTheme(themeData));
                dispatch(changeBackground({
                    type:themeData.backgroundType,
                    value:themeData.backgroundValue
                }))
            }
        }
        t();
    }, []);
    useEffect(() => {

        // add theme.fontFamily to head of DOM
        let head = document.querySelector("head")
        let link = document.createElement("link")
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", `https://fonts.googleapis.com/css2?family=${theme.fontFamily}&display=swap`)
        head?.appendChild(link)
    }, [theme.fontFamily]);
    const changeBack = () => {
        if (background.type === 'color') {
            dispatch(changeBackground({ type: 'gradient', value: '#6D92CA-#A22AEE' }));
        }
        if (background.type === 'gradient') {
            dispatch(changeBackground({ type: 'image', value: 'Nilou_FlHD.png' }));
        }
        if (background.type === 'image') {
            dispatch(changeBackground({ type: 'video', value: 'pexels-rostislav-uzunov-5680034 (1080p).mp4' }));
        }
        if (background.type === 'video') {
            dispatch(changeBackground({ type: 'color', value: '#ccffcc' }));
        }
    }

    return (
        <div className="App" style={{
            fontFamily: theme.fontFamily.split('+').join(' '),
        }}>
            <Background />
            {/* <input type='file' multiple accept='video/*'
                onChange={(e) => { addLocalVideo(e) }}
                className='translate-y-60
                '
            /> */}
            {/* <button
                onClick={changeBack}
            >change</button> */}
            <Application />
            {/* Overlay */}

        </div>
    );
}

export default App;
