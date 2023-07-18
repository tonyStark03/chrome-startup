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
import Slidebar from './features/Components/Slidebar';
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
    useEffect(() => { document.querySelector("body")?.setAttribute("style", `color:${theme.fontColor}`) }, [theme.fontColor])
    useEffect(() => {

        // add theme.fontFamily to head of DOM
        let head = document.querySelector("head")
        let link = document.createElement("link")
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", `https://fonts.googleapis.com/css2?family=${theme.fontFamily}&display=swap`)
        head?.appendChild(link)
    }, [theme.fontFamily]);
    return (
        <div className="App" style={{
            fontFamily: theme.fontFamily.split('+').join(' '),
            fontWeight:theme.fontWeight
        }}>
            <Background />
            <ViewBackground />
            <Application />
        </div>
    );
}

export default App;