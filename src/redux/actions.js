import axios from "axios";
import { BASE_URL } from "../config/constants";
import { toast } from "react-toastify";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";

export const login = (params, history) => {
  return async (dispatch) => {
    axios
      .post(BASE_URL + "/login", params)
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.data.getUserdata });
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("isLogin", true);
        toast.success("Login Successful");
        history.push("/user-detail");
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data });
        toast.warning(err.response.data.message);
      });
  };
};

export const updateUser = (params, history) => {
  return async (dispatch) => {
    axios
      .post(BASE_URL + "/user_edit_profile", params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch({ type: UPDATE_SUCCESS, payload: res.data });
        toast.success(res.data.message);

        history.push("/user-detail");
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };
};
