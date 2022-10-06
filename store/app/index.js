const initialState = {
  isMobile: false,
  openCartMini: false,
  screenWidth: 0,
  numWishList: 0,
  menu: [],
  comment: {},
	stepCheckout:0
};
export default function index(state = initialState, action) {
  switch (action.type) {
    case "app/setMobile":
      const status = action.payload < 768 ? true : false;
      return { ...state, isMobile: status, screenWidth: action.payload };
    case "app/openCartMini":
      return { ...state, openCartMini: action.payload };
    case "app/numWishList":
      return { ...state, numWishList: action.payload };
    case "app/setMenu":
      return { ...state, menu: action.payload };
    case "app/updateComment":
      return { ...state, comment: { ...action.payload } };
    case "app/deleteComment":
      return { ...state, comment: { ...action.payload } };
    case "app/clearComment":
      return { ...state, comment: {} };
    case "app/nextStepCheckout":
			localStorage.setItem('STEP_CHECK_OUT',action.payload)
      return { ...state, stepCheckout: action.payload };
    default:
      return state;
  }
}
