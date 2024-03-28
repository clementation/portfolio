import { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { NavLink } from 'react-router-dom'

import '../styles/NavElements.css'

const width = 3 //3, 7, 11, 15, 19, 23, 27...
const seperation = 1
const duration = 0.35
const scale = 1.35

const c_shift = (scale - 1) * 57.2
const viewWidthMin = 100 + ((width - 1) * 57.2)
const viewWidthMax = viewWidthMin + (c_shift * width)

function Square ({ xPos, isSelected }) {

    return(
        <motion.path //Square
        className={`color${xPos % 4}`}
        style={{originX: 0}}
        animate={{
            scaleX: isSelected ? scale : 1,
            x: isSelected ? (c_shift + 57.2) * xPos : xPos * 57.2
        }}
        transition={{
            duration: duration,
            ease: "easeInOut"
        }}
        initial={false}
        d="M4.82.11h57.2v57.2H4.82z" 
        />
    )
}
  
function ShiftingC ({ xPos, isSelected }){
    return(
        <motion.path //black C
        className={`color${xPos % 4}`}
        animate={{x: isSelected ? c_shift + (c_shift * xPos) + (57.2 * xPos) : 0 + (57.2 * xPos)}}
        transition={{
            duration: duration,
            ease: "easeInOut"
        }}
        initial={false}
        d="M81.63 17.33c6.92 0 12.92 2.54 17.23 6.71 1.84 1.69 1.34 5.29-.64 7.06-1.98 1.69-4.87 1.62-6.64.07-2.54-2.4-6-3.81-9.95-3.81-8.05 0-14.12 6.64-14.12 14.9s6.07 14.9 14.12 14.9c3.95 0 7.41-1.41 9.95-3.81 1.77-1.55 4.66-1.62 6.64.07 1.98 1.77 2.47 5.37.64 7.06-4.31 4.16-10.31 6.71-17.23 6.71-13.91 0-24.43-11.08-24.43-24.92s10.52-24.92 24.43-24.92Z"
        />
    )
}
  
function Row ({ isMirrored, isSelected, isHovered }){

    return(
        <motion.g
            style={{
                scaleX: isMirrored? -1 : 1,
            }}
            animate={{
                originX: isSelected ? (viewWidthMax / 2) / 100 : (viewWidthMin / 2) / 100, //Sets origin to center
                transition: {
                    duration: duration,
                    ease: "easeInOut"
                },
            }}
            initial={false}
        >
            {/* thank you Rob Hess */}
            {Array.from(Array(width)).map((_, xPos) => <Square key={xPos} xPos = {xPos} isSelected={isSelected} />)}

            <path //white c
                className="staticC"
                style={{
                fill: "#fff",
                strokeWidth: 0,
                }}
                d="M24.43 17.33c6.92 0 12.92 2.54 17.23 6.71 1.84 1.69 1.34 5.29-.64 7.06-1.98 1.69-4.87 1.62-6.64.07-2.54-2.4-6-3.81-9.95-3.81-8.05 0-14.12 6.64-14.12 14.9s6.07 14.9 14.12 14.9c3.95 0 7.41-1.41 9.95-3.81 1.77-1.55 4.66-1.62 6.64.07 1.98 1.77 2.47 5.37.64 7.06-4.31 4.16-10.31 6.71-17.23 6.71C10.52 67.19 0 56.11 0 42.27s10.52-24.92 24.43-24.92Z"
            />

            {Array.from(Array(width)).map((_, xPos) => <ShiftingC key={xPos} xPos = {xPos} isSelected={isSelected} />)}
        </motion.g>
    )
}

export default function NavCluster ({ to, selectedPath, setSelectedPath, children }) {

    const [ isHovered, setIsHovered ] = useState(false)

    const [initialRender, setInitialRender] = useState(true);

    // let justChanged = true

    // // After initial render, set initialRender to false
    // useEffect(() => {
    //     console.log(initialRender)
    //     if(!initialRender){
    //         justChanged = false
    //     }
    // }, [selectedPath])

    if (initialRender) {
        setTimeout(() => {
            setInitialRender(false);
        }, 1400);
    }
  
    function checkPath(to, selectedPath){
        return to === selectedPath
    }
    const isSelected = checkPath(to, selectedPath)

    function handleClick(){
        setSelectedPath(to)
    }

    function handleMouseEvter(){
        setIsHovered(true)
    }

    function hanleMouseLeave(){
        setIsHovered(false)
    }
  
    return(
        <NavLink to={to}>
            <div className="navElementWrapper">
                <motion.div
                    // layout
                    className="navCluster"
                    onClick={handleClick}
                    onMouseEnter={handleMouseEvter}
                    onMouseLeave={hanleMouseLeave}
                    initial={false}
                >
                    <motion.svg //New View Box
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 67.17"
                        animate={{viewBox: isSelected ? `0 0 ${ viewWidthMax + 33.2 } ${67.17}` : `0 0 ${ viewWidthMin + 33.2 } ${67.17}`}}
                        transition={{
                            duration: duration,
                            ease: "easeInOut"
                        }}
                        initial={false}
                    >

                        <Row isMirrored={true} isSelected={isSelected} isHovered={isHovered}/>

                    </motion.svg>
                </motion.div>
                <motion.div 
                    // layout
                    className="NavElementInfo"
                    style={{
                        alignItems: initialRender ? "center" : (isSelected || isHovered ) ? "flex-end" : "flex-start"
                    }}
                    transition={{
                        ease: "easeInOut",
                        duration: duration
                    }}
                    initial={false}
                >
                    <motion.div
                        layout
                        className= "NavPieceTitle"
                        initial={false}
                        animate={{
                            fontWeight: isSelected ? 900 : 300,
                            fontSize: isSelected ? "1.2rem" : "0.8rem"
                        }}
                        transition={{
                            ease: "easeInOut",
                            duration: duration
                        }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            </div>
        </NavLink>
    )
}