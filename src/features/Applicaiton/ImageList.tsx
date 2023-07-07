import React, { useEffect } from 'react'
import { getLocalImageList } from '../../app/handlingDatabase'
import Image from './Image'
const ImageList:React.FC = () => {
    const [imageList, setImageList] = React.useState<IDBValidKey[]>([])
    useEffect(() => {
        const t = async () => {
            const list = await getLocalImageList()
            setImageList(list
                // .slice(0, 4)
            )
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
            {imageList.map((imageId,index) => {
                return (
                    <Image id={imageId}
                    key={index}
                    />
                )
            }
            )}
        </div>
    )
}

export default ImageList