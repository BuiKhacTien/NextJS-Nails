
//server
export const BASE_API = "https://nailsbeautysupply.com/"
// export const BASE_API = "https://178.63.64.96:8912/"

// export const BASE_API = "https://skynailsupply.com/"

export const WEBSOCKET = "https://nailsbeautysupply.com/signalr";
// export const WEBSOCKET = "https://178.63.64.96:8912/signalr";
// export const WEBSOCKET = "http://45.119.82.18:5001/signalr";
export const BASE_IMG = 'https://nailssolutions.blob.core.windows.net/images/'
export const BASE_VIDEO = "https://nailssolutions-usso.streaming.media.azure.net/";
export const DATE_TIME_FORMAT = "MM/DD/YYYY HH:mm";
export const DATE_FORMAT = "DD/MM/YYYY";
export const DATE_FORMAT_INPUT = "dd/MM/yyyy";
export const DATE_TIME_FORMAT_INPUT = "dd/MM/yyyy HH:mm";
export const CART_ID = "CART_ID"
export const ORDER_ID = "ORDER_ID"
export const LAST_VIEW = "LAST_VIEW"

export const formCart = (item, cartId = null) => {
   const { feature_Id, id, quantity = 1 } = item
   return {
      cart_id: cartId,
      feature_id: feature_Id,
      product_id: id,
      quantity,
   }
}