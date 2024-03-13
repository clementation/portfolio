import { Link } from 'react-router-dom'
import '../styles/Logo.css'

function MyLogo() {
    return(
        <div className="myLogo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path className="cls-1" d="M0,0v41.73c7.58-7.41,17.94-11.95,29.69-11.95s22.59,4.44,30.11,11.72c3.21,2.96,2.34,9.26-1.11,12.34-3.46,2.96-8.52,2.84-11.6.12-4.44-4.2-10.49-6.66-17.4-6.66-14.07,0-24.68,11.6-24.68,26.04s10.61,26.04,24.68,26.04c6.91,0,12.96-2.47,17.4-6.66,3.09-2.71,8.15-2.84,11.6.12,1.96,1.75,3.05,4.53,3.07,7.16h38.24V0H0Z"/>
            </svg>
        </div>
    )
}

export default function Logo() {
    return(
        <Link to="/portfolio" className="logoWrapper">
            <MyLogo />
            <h2 className="logoName">CONNOR{"\n"}KEALEY</h2>
        </Link>
    )
}