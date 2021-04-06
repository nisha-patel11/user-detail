import { LOGIN_SUCCESS, LOGIN_FAIL, UPDATE_SUCCESS } from "./actions";

const initialState = {
  loginSuccessData: [],
  loginFailData: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccessData: action.payload,
        loginFailData: [],
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginFailData: action.payload,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        loginSuccessData: {
          ...state.loginFailData,
          firstname: action.payload.data.firstname,
          lastname: action.payload.data.lastname,
          email: action.payload.data.email,
          phone_number: action.payload.data.phone_number,
          profile_picture: action.payload.data.profile_picture,
        },
      };
    default:
      return { ...state };
  }
};
export default user;
