import React, { useEffect } from 'react'
import { getLocalImageList, getLocalImage } from '../../app/handlingDatabase'
import Image from './Image'
interface Props {
    children?: React.ReactNode
}
const HorizontalList: React.FC<Props> = ({children}) => {
    return (
        <div className='
        '
            style={{
                height: '33%',
                width: '100%',
                }}
        >
            {children}
        </div>
    )
}


export default HorizontalList