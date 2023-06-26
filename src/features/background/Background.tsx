import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectBackground,
} from './backgroundSlice'
import { getLocalImage, getLocalImageList, getLocalVideo } from '../../app/handlingDatabase';

const Background: React.FC = () => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const background = useAppSelector(selectBackground);
    useEffect(() => {
        if (background.type === "color") {
            changeBackgroundColour(background.value);
        }
        if (background.type === "gradient") {
            changeBackgroundGradient(background.value.split('-'));
        }
        if (background.type === "image") {
            changeBackgroundImage(background.value);
        }
        if (background.type === "video") {
            changeBackgroundVideo();
        }
    }, [background]);
    const changeBackgroundImage = (imageValue: string) => {
        const backgroundEle = document.querySelector('.BACKGROUND');
        backgroundEle?.removeAttribute('style');
        getLocalImageList().then((imageList) => {
            for (let i = 0; i < imageList.length; i++) {
                if (imageList[i] === imageValue) {
                    getLocalImage(imageList[i]).then((image) => {
                        if (image === null) {
                            return;
                        }
                        let typedArray = new Uint8Array(image);
                        const STRING_CHAR = typedArray.reduce((data, byte) => {
                            return data + String.fromCharCode(byte);
                        }, '');
                        let base64String = window.btoa(STRING_CHAR);
                        backgroundEle?.setAttribute('style', `background-image: url(data:image/png;base64,${base64String});`)

                    });
                    break;
                }
            }
        });

        console.log('changeBackgroundImage');
    }
    const changeBackgroundColour = (hexValue: string) => {
        const backgroundEle = document.querySelector('.BACKGROUND');
        backgroundEle?.removeAttribute('style');
        backgroundEle?.setAttribute('style', `background-color: ${hexValue};`)
        console.log('changeBackgroundColour');
    }
    const changeBackgroundGradient = (gradientValue: string[]) => {
        const backgroundEle = document.querySelector('.BACKGROUND');
        backgroundEle?.removeAttribute('style');
        backgroundEle?.setAttribute('style', `background-image: linear-gradient(${gradientValue[0]}, ${gradientValue[1]});`)
        console.log('changeBackgroundGradient');
    }

    const changeBackgroundVideo = () => {
        const backgroundEle = document.querySelector('.BACKGROUND');
        backgroundEle?.removeAttribute('style');
        getLocalVideo(background.value).then((video) => {
            if (video === null) {
                return;
            }
            let blob = new Blob([video], { type: 'video/mp4' });
            let videoBlobURL = URL.createObjectURL(blob);
            videoRef.current?.setAttribute('src', videoBlobURL);
            
        });
        console.log('changeBackgroundVideo');
    }
    const getVideoURL = () => {
        let videoBlobURL = '';
        
        console.log(videoBlobURL);
        return videoBlobURL;
    }
    return (
        <div className='BACKGROUND fixed top-0 left-0 w-full h-full -z-50'>
            {/* play video in loop indefinately */}
            {background.type === "video" &&
                <video className='w-full h-full object-cover' ref={videoRef}  
                autoPlay loop muted playsInline
                />
            }
        </div >
    )
}

export { Background }
