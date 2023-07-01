import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Background } from './features/background/Background';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { addLocalImage, addLocalVideo, getLocalImageList } from './app/handlingDatabase';
import {
    changeBackground,
    selectBackground,
} from './features/background/backgroundSlice'
import {
    selectTheme,
} from './features/theme/themeSlice'
import Application from './features/Applicaiton/Application';
import Setting from './features/Setting/Setting';
const App = () => {
    let background = useAppSelector(selectBackground);
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    useEffect(() => {

        // add theme.fontFamily to head of DOM
        let head = document.querySelector("head")
        let link = document.createElement("link")
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", `https://fonts.googleapis.com/css2?family=${theme.fontFamily}&display=swap`)
        head?.appendChild(link)
        console.log('theme.fontFamily', theme.fontFamily);
    }, [theme]);
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
        <div className="App">
            <Background />
            {/* <input type='file' multiple accept='video/*'
                onChange={(e) => { addLocalVideo(e) }}
            />
            <button
                onClick={changeBack}
            >change</button> */}
            <Application />
            {/* Overlay */}
            {theme.displaySetting &&
                <Setting/>
            }
        </div>
    );
}

export default App;
