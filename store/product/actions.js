import productApi from "../../api/productApi"

export const getListHome = () => dispatch => {
   productApi.listHome().then(res => {
      if (res) {
         dispatch({ type: 'product/setListHome', payload: res })
      }
   })
}
export const getDealsCenter = (alias, nameKey = 'dealsCenter') => dispatch => {
   productApi.dealsCenter(alias).then(res => {
      if (res) {
         dispatch({ type: 'product/setProducts', payload: { res, nameKey } })
      }
   })
}
export const getLastOrdered = () => dispatch => {
   productApi.lastOrdered().then(res => {
      if (res) {
         dispatch({ type: 'product/setProducts', payload: { res, nameKey: 'lastOrdered' } })
      }
   })
}