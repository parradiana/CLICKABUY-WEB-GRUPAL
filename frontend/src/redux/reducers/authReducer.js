const initialState = {
  userLogged: null,
  userRole: '',
  firstAnimation: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      return {
        ...state,
        userLogged: action.payload,
      };

    case "LOG_OUT":
      localStorage.clear();
      return {
        ...state,
        userLogged: null,
      };

    case "USER_ROLE":
      return {
        ...state,
        userRole: action.payload
      };
    case 'ANIMATION_STATE':
      return{
        firstAnimation: action.payload
      }  
    default:
      return state;
  }
};
export default authReducer;
