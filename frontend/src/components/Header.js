import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Categories from "./Categories";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import productsActions from "../redux/actions/productsActions";
import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import "../../src/gracia.css";
import { useLocation } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTags } from 'react-icons/fa'

const Header = (props) => {
  const { userLogged, userRole } = props
  const usuarioImage = userLogged ? <div style={{ backgroundImage: `url(${userLogged.userImg.url})` }} className="usuarioImage"></div> : <span className="material-icons-outlined iconUser">account_circle</span>

  const { pathname } = useLocation();
  const [productFilter, setProductFilter] = useState('')


  const [userRoleState, setUserRoleState] = useState('')

  useEffect(() => {
    setUserRoleState(userRole)
  }, [userRole])

  function handleFilter(e) {
    props.filtrar(e.target.value)
  }

  return (

    <header className="headerContainer">
      <div className="contenedorFlexHome">
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="barraNav" id="basic-navbar-nav">
            <Nav className="mr-auto contenedorNavs">
              <Link to="/" className="linkLogoHome">
                <div className="contenedorLogo">
                  <FaTags className="logoHome" />
                  <h1>clickabuy</h1>
                </div>
              </Link>
              
        <div className="contenedorLinksHome">

              <NavLink exact to="/" className="navegadores">Home</NavLink>
              {!userLogged ?
                <>
                  <NavLink to="/login" className="navegadores">Log In</NavLink>
                  <NavLink to="/signup" className="navegadores">Sign Up</NavLink>
                </>
                :
                <>
                  <Link to="/" className="navegadores"><span onClick={() => props.logOut()}>Log Out</span></Link>
                </>
              }
              <NavLink to="/buys" className="navegadores"><span className="material-icons-outlined iconCart">shopping_cart</span></NavLink>
              <Link to="/favorites" className="navegadores"><FaRegHeart className="iconFavoritesHome" /></Link>
              <div>{usuarioImage}</div>

</div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </div>
      <div className="contenedorSearch">
        <Categories />
        <div className={pathname === "/" ? "contenedorFiltro" : "contenedorFiltro2"}>
          <input type="text" className="filtroHome" placeholder="Search products" onChange={(e) => handleFilter(e)}></input>
          <NavLink to="/products"><span className="material-icons-outlined iconSearchHome">search</span></NavLink>
        </div>
        {
          userLogged &&
          <Link
            to={userRoleState === 'adminApp' ? "/adminApp" : userRoleState === 'adminStores' ? "/myStores" : "/SignUpStore"}
            className="linkRegisterStore"
          >{userRoleState === 'adminApp' ? "Admin general" : userRoleState === 'adminStores' ? "Admin your store" : "Register your Store"}</Link>
        }
        {/* <Link to="/myStoresView"></Link> */}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    userLogged: state.authReducer.userLogged,
    userRole: state.authReducer.userRole,
    filterProducts: state.productReducer.filterProducts
  };
};

const mapDispatchToProps = {
  logOut: authActions.logOutUser,
  filtrar: productsActions.filterProducts,
  getAllProducts: productsActions.getAllProducts,
  checkUserRole: authActions.checkUserRole
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
