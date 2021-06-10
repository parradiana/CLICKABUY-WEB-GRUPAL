// import Dropdown from 'react-bootstrap/Dropdown'
// import { connect } from 'react-redux'
// import {Link, NavLink} from 'react-router-dom'
// import authActions from '../redux/actions/authActions'
// const UserDropdown = (props) => {
//     // const {userLogged} = props
//     // const usuarioImage = userLogged ? <div style={{backgroundImage: "url('./assets" + userLogged.userImg + "')"}} className="usuarioImage"></div> : <span className="material-icons-outlined iconUser">account_circle</span>
//     return(
//         <Dropdown>
//             <Dropdown.Toggle id="dropdown-basic">
//                 {usuarioImage}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//                 {!userLogged 
//                 ?
//                     <>
//                         <NavLink to="/signUp" className="nameCategory">Sign Up</NavLink>
//                         <NavLink to="/SignIn" className="nameCategory">Sign In</NavLink>
//                     </>
//                 :   <>
//                         <Link to="/favorites" className="nameCategory">Favorites</Link>              
//                         <Link to="/" className="nameCategory"><span onClick={() => props.logOut()}>Sign Out</span></Link>
//                     </>
//                 }
//             </Dropdown.Menu>
//         </Dropdown>    
//     )
// }
// const mapStateToProps = (state) => {
//     return {
//       userLogged: state.authReducer.userLogged
//     }
// }
// const mapDispatchToProps = {
//     logOut: authActions.logOutUser
// }
// export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown)