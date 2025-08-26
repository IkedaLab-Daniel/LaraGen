import { Link } from 'react-router-dom'
const NavBar = () => {
    
    return(
        <nav className="flex justify-between px-12 py-4 bg-[#ffffff00] shadow-md fixed w-full z-[1] shadow-blue-100">
            <div>
                <h1>Logo</h1>
            </div>
            <div>
                <ul className="flex gap-8">
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/contents">
                        <li>Contents</li>
                    </Link>
                    <Link to="/login">
                        <li>Log In</li>
                    </Link>
                    <Link to="/signup">
                        <li>Sign Up</li>
                    </Link>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar