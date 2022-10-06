const initialState = {
  user: {},
  isLogin: false,
  needUpdate: true,
  infoComments: {},
  link: '',
};
export default function index(state = initialState, action) {
  switch (action.type) {
    case "user/login":
      localStorage.setItem("accessToken", action.payload);
      return { ...state, isLogin: true };
    case "user/logout":
      localStorage.clear();
      return { ...state, isLogin: false, user: {} };
    case "user/register":
      return state;
    case "user/setProfile":
      return { ...state, user: action.payload };
    case "user/update":
      return { ...state, needUpdate: action.payload };
    case "user/addInfoComments":
      return { ...state, infoComments: action.payload.params, link: action.payload.link };
    case "user/clearInfoComments":
        return { ...state, infoComments: {}, link: '' };
    default:
      return state;
  }
}
