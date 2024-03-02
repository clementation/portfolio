import { useState, useEffect } from 'react'

import {
    Link,
    NavLink,
    Outlet,
    useOutlet,
    useParams,
    useSearchParams,
    useLocation,
    useRouteError
} from 'react-router-dom'

import NavCluster from './components/NavCluster'
import Cluster from './components/Cluster'
import Logo from './components/Logo'
import Gallery from './components/Gallery'

export function Root({ children }) {
    const location = useLocation()
    const [selectedPath, setSelectedPath] = useState(location.pathname)

    useEffect(() => {
        setSelectedPath(location.pathname)
    },[location])

    return (
        <>
            <nav>
                <Logo />
                <NavCluster to={"/"} selectedPath={selectedPath} setSelectedPath={setSelectedPath} >PORTFOLIO</NavCluster>
                <NavCluster to={"/about"} selectedPath={selectedPath} setSelectedPath={setSelectedPath} >ABOUT</NavCluster>
                <NavCluster to={"/contact"} selectedPath={selectedPath} setSelectedPath={setSelectedPath} >CONTACT</NavCluster>
                <Cluster />
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export function Portfolio({ children }) {

    return (
        <>
            <div className="pagePlaceHolder">
                <h1>HELLO WORLD!</h1>
                {/* <h2>This is my Portfolio page</h2> */}
                {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos omnis eum nesciunt tempora facilis neque molestiae fugiat incidunt aperiam nemo inventore expedita esse eveniet atque fuga, deleniti, est sequi laboriosam expedita esse.</p>
                <main>{children || <Outlet />}</main> */}
            </div>
            <Gallery />
        </>
    )
}

export function About(props) {

    return(
        <div className="pagePlaceHolder">
            <h1>HEY WORLD!</h1>
            <h2>This is my About page</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet beatae, ullam soluta perferendis consequatur inventore libero non mollitia? Officia fugiat pariatur vel quibusdam eaque nihil aperiam ab ad nobis autem?</p>
        </div>
    
    )
}

export function Contact(props) {

    return(
        <div className="pagePlaceHolder">
            <h1>SUP WORLD!</h1>
            <h2>This is my Contact page</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptatibus commodi beatae ratione quasi sequi excepturi atque, asperiores, expedita provident quam reiciendis, placeat ipsum mollitia in eligendi quas voluptatem qui!</p>
        </div>
    )
}

export function ErrorPage() {
    const error = useRouteError()
    console.error(error)
    return (
        <>
            <h1>Error</h1>
            <p>{error.statusText || error.message}</p>
        </>
    )
}