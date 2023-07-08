import React, { useEffect } from 'react'
import { getGradientList } from '../../app/handlingDatabase'
import Gradient from './Gradient'

const GradientList:React.FC = () => {
    const [gradientList, setGradientList] = React.useState<IDBValidKey[]>([])
    useEffect(() => {
        const t = async () => {
            const list = await getGradientList()
            setGradientList(list
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
            {gradientList.map((gradientId, index) => {
                return (
                    <Gradient id={String(gradientId)}
                        key={index}
                    />
                )
            }
            )}
        </div>
  )
}

export default GradientList