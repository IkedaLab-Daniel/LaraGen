
const NavBar = () => {
    
    return(
        <nav className="flex justify-between px-12 py-4 bg-[#ffffff00] shadow-md fixed w-full z-[1]">
            <div>
                <h1>Logo</h1>
            </div>
            <div>
                <ul className="flex gap-8">
                    <li>Home</li>
                    <li>Contents</li>
                    <li>Log In</li>
                    <li>Sign Up</li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar