import {NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbarContainer">
            <div>
                <span>Logo</span>
            </div>
            <div>
                <input type="text" className="filterNavbar">
                </input>
            </div>
            <div className="navbarLinks">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/buys"><span className="material-icons-outlined">shopping_cart</span></NavLink>
                
            </div>
        </div>
    )
}

export default Navbar