import "./css/sofia.css";
import "./css/julio.css";
import "./css/lucas.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import authActions from "./redux/actions/authActions";
import { connect } from "react-redux";
import cartActions from "./redux/actions/cartActions";
import getRouteRoles from './helpers/routesRoles'



const App = ({ cart, reloadCartLS, loginForced, userLogged, history, checkUserRole, firstAnimation, animationState }) => {
  if (cart.length === 0) {
    let cartLS = localStorage.getItem("cartLS");
    if (cartLS !== "undefined" && cartLS !== null) {
      cartLS = JSON.parse(cartLS);
      if (cartLS instanceof Array && cartLS.length !== 0) reloadCartLS(cartLS);
    } else localStorage.removeItem("cartLS");
  }
  if (userLogged) {
    checkUserRole(userLogged.token)
  }
  const token = localStorage.getItem("token");
  if (!userLogged && token && token !== "undefined") {
    loginForced(JSON.parse(token), history);
    return null;
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      {userLogged ? getRouteRoles(userLogged.role) : getRouteRoles("notLogged")}
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    userLogged: state.authReducer.userLogged,
    firstAnimation: state.authReducer.firstAnimation
  };
};
const mapDispatchToProps = {
  reloadCartLS: cartActions.reloadCartLS,
  loginForced: authActions.loginForced,
  checkUserRole: authActions.checkUserRole,
  animationState: authActions.animationState

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
