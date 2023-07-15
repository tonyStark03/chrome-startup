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
    selectTheme, changeTheme, themeSliceProps,
} from './features/theme/themeSlice'
import ViewBackground from './features/viewBackground/ViewBackground';
import Application from './features/Applicaiton/Application';

import { getThemeFromLocalStorage, addGradient } from './app/handlingDatabase'
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
                let t = JSON.stringify({ ...theme }).slice(1, -1).split(",");
                let tD = JSON.stringify({ ...themeData }).slice(1, -1).split(",")
                for (let i = 0; i < t.length; i++) {
                    let key = t[i].split(":")[0].slice(1, -1)
                    for (let j = 0; j < tD.length; j++) {
                        if (tD[j].includes(key)) {
                            let value = tD[j].split(":")[1]
                            t[i] = `"${key}":${value}`
                        }
                    }
                }
                dispatch(changeTheme(JSON.parse(`{${t.join(",")}}`)));
                console.log(JSON.stringify(themeData))
                dispatch(changeBackground({
                    type: themeData.backgroundType,
                    value: themeData.backgroundValue
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
            <ViewBackground />
            <Application />

            {/* Overlay */}

        </div>
    );
}

export default App;
