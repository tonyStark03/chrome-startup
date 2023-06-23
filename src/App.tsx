import React from 'react';
import logo from './logo.svg';
import { Background } from './features/background/Background';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import {
    addNewBackground,
    selectBackground,
} from './features/background/backgroundSlice'

function App() {
    let background = useAppSelector(selectBackground);
    const dispatch = useAppDispatch();
    const changeBackground = () => {
        if(background.type === 'color') {
            dispatch(addNewBackground({type: 'gradient', value: '#6D92CA-#A22AEE'}));
        }
        if(background.type === 'gradient') {
            dispatch(addNewBackground({type: 'color', value: '#ccffcc'}));
        }
    }
    return (
        <div className="App">
            <Background />
            <button
            onClick={changeBackground}
            >change</button>
        </div>
    );
}

export default App;
