import React, { useEffect } from 'react'
import { getLocalVideoList } from '../../app/handlingDatabase'
import Video from './Video'

const VideoList: React.FC = () => {
    const [videoList, setVideoList] = React.useState<IDBValidKey[]>([])
    useEffect(() => {
        const t = async () => {
            const list = await getLocalVideoList()
            setVideoList(list
                // .slice(0, 4)
            )
            console.log(list)
        }
        t();
    }, [])
    return (
        <div className='w-full flex flex-row overflow-x-scroll  h-full no-scrollbar 
            '
            style={{
                scrollSnapAlign: 'start',
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                overflow: 'visible',
            }}
        >
            {videoList.map((imageId, index) => {
                return (
                    <Video id={imageId}
                        key={index}
                    />
                )
            }
            )}
        </div>
    )
}

export default VideoList