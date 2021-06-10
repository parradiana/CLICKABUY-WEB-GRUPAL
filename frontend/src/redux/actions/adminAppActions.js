import { showToast, showTostError500 } from "../../helpers/myToast";
import axios from "axios";
import API from "../../helpers/api";

const adminAppActions = {
  getAllRequest: (token) => {
    return  async (dispatch) => {
      try {
        const { data } = await axios.get(API + "/request", {
            headers: { "Authorization": "Bearer "+token },
        });
        if(data.success)
            return data.response;
        else
            showToast("error",data.error);
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },
  approveRequest: (token,idRequest) => { 
    return async (dispatch) => {
      try {
        const { data } = await axios.post(API + "/respondRequest/"+idRequest, {},{
            headers: { "Authorization": "Bearer "+token },
        });
        if(data.success)
            return data;
        else
            showToast("error",data.error);
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },
  rejectRequest: (token,idRequest) => { 
    return async (dispatch) => {
      try {
        const { data } = await axios.delete(API + "/respondRequest/"+idRequest, {
            headers: { "Authorization": "Bearer "+token },
        });
        if(data.success)
            return data;
        else
            showToast("error",data.error);
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },

};


export default adminAppActions;
