import axios from "axios";
import API from "../../helpers/api";
import { showToast, showTostError500 } from "../../helpers/myToast";

const authActions = {
  signUpUser: (objInputsValues) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.post(API + "/users", objInputsValues, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (data.success) {
          dispatch({ type: "LOGIN_USER", payload: data.response });
          showToast("success", `Welcome ${data.response.firstName} ${data.response.lastName}`);
        } else {
          return console.log(data);
        }
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },
  logInUser: (objInputsValues) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.post(API + "/login", objInputsValues);
        if (data.success) {
          dispatch({ type: "LOGIN_USER", payload: data.response });
          showToast(
            "success",
            `Welcome ${data.response.firstName} ${data.response.lastName}`
          );
        } else {
          return data;
        }
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },
  loginForced: (token) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(API + "/relogin", {
          headers: { Authorization: "Bearer " + token },
        });
        dispatch({
          type: "LOGIN_USER",
          payload: {
            ...data.response,
            token,
          },
        });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          showToast("error", "What are you trying to do ??");
        }
      }
    };
  },
  logOutUser: () => {
    return (dispatch) => {
      dispatch({ type: "LOG_OUT" });
      showToast("info", "Hope to see you soon!")
    };
  },
  checkUserRole: (token) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(API + "/userCheckRole", {
          headers: { Authorization: "Bearer " + token },
        });
        dispatch({ type: "USER_ROLE", payload: response.data.response })

      } catch (err) {
        if (err) {
          console.log(err)
        }
      }
    }
  },
  animationState: () => {
    return (dispatch) => {
        dispatch({type: 'ANIMATION_STATE', payload: false})
    }
  },
}

export default authActions;
