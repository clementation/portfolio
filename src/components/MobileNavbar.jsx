import { NavLink } from "react-router-dom"

export default function MobileNavbar() {

    return(
        <ul>
            <li><NavLink to="/">PORTFOLIO</NavLink></li>
            <li><NavLink to="/about">ABOUT</NavLink></li>
            <li><NavLink to="/contact">CONTACT</NavLink></li>
        </ul>
    )
}