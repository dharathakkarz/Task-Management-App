import { login_fail, login_request, login_success, save_profile, update_profile_request, update_profile_success,update_profile_fail, logout_done } from "../actions/actionTypes"

const initialState = {
  loading: false,
  user: {},
  isLoggedIn: false,
  token: "",
  successMsg: "",
  errorMsg: "",
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case login_request:
      return { loading: true, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: "", };
    case login_success:
      return { loading: false, user: action.payload.user, isLoggedIn: true, token: action.payload.token, successMsg: action.payload.msg, errorMsg: "" };
    case login_fail:
      return { loading: false, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: action.payload.msg };
    case logout_done:
      return { loading: false, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: "" }
    case save_profile:
      return { loading: false, user: action.payload.user, isLoggedIn: true, token: action.payload.token, successMsg: "", errorMsg: "" }
      case update_profile_request:
      return { ...state, loading: true, successMsg: "", errorMsg: "" };
    case update_profile_success:
      return { ...state, loading: false, user: action.payload.user, successMsg: action.payload.msg, errorMsg: "" };
    case update_profile_fail:
      return { ...state, loading: false, successMsg: "", errorMsg: action.payload.msg };
    
    default:
      return state;
  }
}

export default authReducer;