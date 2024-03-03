import { motion } from "framer-motion"
import { useState, useEffect } from "react"

import '../styles/Clusters.css'

function Square ({ xPos }) {

    return(
        <motion.path //Square
        className={`color${xPos % 4}`}
        style={{x: xPos * 57.2}}
        initial={false}
        d="M4.82.11h57.2v57.2H4.82z" 
        />
    )
}
  
function ShiftingC ({ xPos }){
    return(
        <motion.path //black C
        className={`color${xPos % 4}`}
        style={{x: (57.2 * xPos)}}
        initial={false}
        d="M81.63 17.33c6.92 0 12.92 2.54 17.23 6.71 1.84 1.69 1.34 5.29-.64 7.06-1.98 1.69-4.87 1.62-6.64.07-2.54-2.4-6-3.81-9.95-3.81-8.05 0-14.12 6.64-14.12 14.9s6.07 14.9 14.12 14.9c3.95 0 7.41-1.41 9.95-3.81 1.77-1.55 4.66-1.62 6.64.07 1.98 1.77 2.47 5.37.64 7.06-4.31 4.16-10.31 6.71-17.23 6.71-13.91 0-24.43-11.08-24.43-24.92s10.52-24.92 24.43-24.92Z"
        />
    )
}
  
function Row ({ isTopRow, gridWidth, viewWidth }){

    return(
        <motion.g
            style={{
                scaleX: isTopRow ? -1 : 1,
                translateX: isTopRow ? 0 : 33.2,
                translateY: isTopRow ? 0 : 57,
                originX: (viewWidth / 2) / 100

            }}
            initial={false}
        >
            {/* thank you Rob Hess */}
            {Array.from(Array(gridWidth)).map((_, xPos) => <Square key={xPos} xPos={xPos} />)}

            <path //white c
                className="staticC"
                style={{
                    fill: "#fff",
                    strokeWidth: 0,
                }}
                d="M24.43 17.33c6.92 0 12.92 2.54 17.23 6.71 1.84 1.69 1.34 5.29-.64 7.06-1.98 1.69-4.87 1.62-6.64.07-2.54-2.4-6-3.81-9.95-3.81-8.05 0-14.12 6.64-14.12 14.9s6.07 14.9 14.12 14.9c3.95 0 7.41-1.41 9.95-3.81 1.77-1.55 4.66-1.62 6.64.07 1.98 1.77 2.47 5.37.64 7.06-4.31 4.16-10.31 6.71-17.23 6.71C10.52 67.19 0 56.11 0 42.27s10.52-24.92 24.43-24.92Z"
            />

            {Array.from(Array(gridWidth)).map((_, xPos) => <ShiftingC key={xPos} xPos = {xPos} />)}
        </motion.g>
    )
}

export default function Cluster () {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    }

    useEffect(() => {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let gridWidth = null
    const width = windowDimensions.width

    switch(true){
        case width > 1600:
            gridWidth = 15
            break
        case width > 1400:
            gridWidth = 11
            break
        case width > 1200:
            gridWidth = 7
            break
        case width > 900:
            gridWidth = 3
            break
        default:
            gridWidth = 1
    }

    // const gridWidth = 3 //3, 7, 11, 15, 19, 23, 27...
    let viewWidth = 100 + ((gridWidth - 1) * 57.2)
  
    return(
        <div className="navClusterWrapper">
            <motion.div
                className="navCluster"
                layout
            >
                <motion.svg //New View Box
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox= {`0 0 ${ viewWidth - 6} ${67.17 + (57.2 * 2)}`}
                    initial={false}
                >

                    <Row isTopRow={false} gridWidth={gridWidth} viewWidth={viewWidth} />
                    <Row isTopRow={true} gridWidth={gridWidth} viewWidth={viewWidth} />

                </motion.svg>
            </motion.div>
        </div>
    )
}