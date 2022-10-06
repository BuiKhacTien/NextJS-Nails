import userApi from "../../api/userApi";

export const getProfile = () => (dispatch) => {
  userApi.info().then((res) => {
    if (res) {
      dispatch({ type: "user/setProfile", payload: res });
    }
  });
};
export const loginUser = (params) => (dispatch) => {
  return new Promise((resolve, _) => {
    userApi.login(params).then((res) => {
      if (res && res.accessToken) {
        dispatch({ type: "user/login", payload: res.accessToken });
        resolve(true);
      }
    });
  });
};

export const addInfoComments = (payload) => {
  return {
    type: "user/addInfoComments",
    payload,
  };
};

export const clearInfoComments = () => {
  return {
    type: "user/clearInfoComments",
  };
};
