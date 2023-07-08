import React, { useEffect } from 'react'
import { getSolidColorList } from '../../app/handlingDatabase'
import Color from './Color'

const ColorList: React.FC = () => {
    const [colorList, setColorList] = React.useState<IDBValidKey[]>([])
    useEffect(() => {
        const t = async () => {
            const list = await getSolidColorList()
            setColorList(list
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
                overflow: 'hidden',
            }}
        >
            {colorList.map((colorId, index) => {
                return (
                    <Color id={String(colorId)}
                        key={index}
                    />
                )
            }
            )}
        </div>
    )
}

export default ColorList