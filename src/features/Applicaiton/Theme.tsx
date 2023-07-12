import React from 'react'
import { ColorPicker, useColor } from 'react-color-palette'
import "react-color-palette/lib/css/styles.css";
function Themes() {
    const [color, setColor] = useColor("hex", "#121212");
    const colour = color.hex;
    return (
        <div className=''>

            <div className="w-2/6 px-3" style={{
                backgroundColor: colour,
            }}>


                <ColorPicker width={450} height={228}
                    color={color}
                    onChange={setColor} hideHSV dark />
            </div>
        </div>
    )
}

export default Themes;