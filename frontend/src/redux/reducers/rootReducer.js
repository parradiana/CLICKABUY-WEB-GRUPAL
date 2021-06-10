import { combineReducers } from "redux";
import categoryReducer from './categoryReducer'
import authReducer from "./authReducer";
import cartReducer from "./cartReducer"
import productReducer from "./productReducer";
import adminStoreReducer from "./adminStoreReducer";

const rootReducer = combineReducers({  categoryReducer, authReducer, productReducer, cartReducer, adminStoreReducer})

export default rootReducer