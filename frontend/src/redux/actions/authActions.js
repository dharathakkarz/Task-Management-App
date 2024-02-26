import api from "../../api"
import { login_fail, login_request, login_success, logout_done, save_profile, update_profile_fail, update_profile_success, update_profile_request } from "./actionTypes"
import { toast } from "react-toastify";

export const postLoginData = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: login_request });
    const { data } = await api.post('/auth/login', { email, password });
    dispatch({
      type: login_success,
      payload: data,
    });
    localStorage.setItem('token', data.token);
    toast.success(data.msg);

  }
  catch (error) {
    const msg = error.response?.data?.msg || error.message;
    dispatch({
      type: login_fail,
      payload: { msg }
    })
    toast.error(msg);
  }
}



export const saveProfile = (token) => async (dispatch) => {
  try {
    const { data } = await api.get('/profile', {
      headers: { Authorization: token }
    });
    dispatch({
      type: save_profile,
      payload: { user: data.user, token },
    });
  }
  catch (error) {
    // console.log(error);
  }
}



export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: logout_done });
  document.location.href = '/';
}

export const updateProfileRequest = () => ({
  type: update_profile_request.update_profile_request,
});

export const updateProfileSuccess = (user) => ({
  type: update_profile_success.update_profile_success,
  payload: user,
});

export const updateProfileFailure = (error) => ({
  type: update_profile_fail.update_profile_fail,
  payload: error,
});