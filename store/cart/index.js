import { CART_ID, ORDER_ID } from "../../constants/appSetting";

const initialState = {
   cart: {},
   checkShipping: false,
   shippingFee: 0,
   loading: false
};
export default function index(state = initialState, action) {
   switch (action.type) {
      case "cart/addCart":
         const cart = action.payload
         localStorage.setItem(CART_ID, cart.id)
         const timeOut = new Date().getTime() + 21600000
         localStorage.setItem("TIME_OUT", timeOut)
         return { ...state, cart: action.payload };
      case "cart/update":
         const item = action.payload
         const { productCartModels } = state.cart
         const index = productCartModels.findIndex(existingItem => existingItem.id === item.id && existingItem.feature_Id === item.feature_Id)
         productCartModels[index] = item
         const cartUpdate = { ...state.cart, productCartModels }
         return { ...state, cart: cartUpdate }
      case "cart/checkShipping":
         return { ...state, checkShipping: action.payload }
      case "cart/paymentSuccess":
         localStorage.removeItem(ORDER_ID)
         localStorage.removeItem(CART_ID)
         return { ...state, cart: {} }
      case 'cart/shippingFee':
         return { ...state, shippingFee: action.payload }
      default:
         return state;
   }
}
