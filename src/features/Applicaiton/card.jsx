import Person4Icon from "@mui/icons-material/Person4";
import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
const Card = () => {
    const [isHovering, setIsHovering] = useState(false);
    const controls = useAnimationControls();
    useEffect(() => {
        controls.start({
            y: 20,
        });
    }, []);
    const handleMouseOver = () => {
        setIsHovering(true);
        controls.start({
            y: 0,
        });
    };
    const handleMouseOut = () => {
        setIsHovering(false);
        controls.start({
            y: 20,
        });
    };
    return (
        <div
            className=" border-solid h-full hover:bg-purple-400 justify-center pt-16 transition-all relative
            "
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
            style={{
                aspectRatio: "4/5",
            }}
        >
            <Person4Icon
                className="border-solid rounded-lg w-25 p-3 h-25 bg-black 
                "
                style={{
                    aspectRatio: "1/1",
                }}
            />
            {/* EMPTY DIV TO INCLUDE SPACE BETWEEN ICON AND TEXT */}
            <div
                style={{
                    height: "20vh",
                }}
            ></div>
            <div>
                <motion.h1
                    animate={controls}
                    transition={{
                        duration: 0.1,
                        ease: "easeOut",
                    }}
                    className="text-2xl font-bold 
                "
                >
                    Card
                </motion.h1>

                {isHovering && (
                    <div
                        className="pt-1 text-sm hover:top-6
                "
                    >
                        blah blah blah blah
                    </div>
                )}
            </div>
        </div>
    );
};
export default Card;
