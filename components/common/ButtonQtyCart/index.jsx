import React, { useState, useEffect} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { formCart } from '../../../constants/appSetting'
import { useDispatch, useSelector } from 'react-redux'
import cartApi from '../../../api/cartApi'
import { getShippingFee } from '../../../store/cart/actions'
const Index = ({ data = {}, onChange, onError }) => {
  const [quantity, setQuantity] = useState(1)
  const { cart, loading } = useSelector(state => state.cart)
  const { productCartModels = [] } = cart
  const dispatch = useDispatch()
  useEffect(() => {
    getQuantity()
  }, [productCartModels])
  const getQuantity = () => {
    if (!cart.id || !data.id) return setQuantity(1)
    if (productCartModels && productCartModels.length > 0) {
      const currentModel = productCartModels.find(item => item.id === Number(data.id) && item.feature_Id === Number(data.feature_Id))
      if (currentModel) return setQuantity(currentModel.quantity)
    } 
    return setQuantity(1)
  }
  useEffect(() => {
    setQuantity(1)
  },[data.feature_Id])
  const handleQty = (v) => {
    const newQty = quantity + v
    if (newQty !== 0) {
      const newData = { ...data, quantity: newQty }
      const params = paramsCart(cart, newData)
      cartApi.addCart(params).then(res => {
        if (res) {
          dispatch({ type: "cart/addCart", payload: res });
          if (!loading)
            dispatch(getShippingFee(res.id))
          if (onChange) onChange()
        }
      }).catch(() => onError && onError())
    }
  }
  const paramsCart = (cart, item) => {
    const { id, feature_Id } = item
    const { productCartModels = [] } = cart
    const indexInCart = productCartModels.findIndex(
      (existingItem) => 
        Number(existingItem.id) === Number(id) && Number(existingItem.feature_Id) === Number(feature_Id)
    );
    if (indexInCart !== -1) {
      productCartModels[indexInCart] = item

    } else {
      productCartModels.push(item)
    }
    const params = productCartModels.map((item) => formCart(item, cart.id));
    return params
  }
  const handleChange = (e) => { }
  // console.log({data,productCartModels})
  return (
    <div>
      <InputGroup className="btn-qty-cart">
        <Button onClick={() => handleQty(-1)} disabled={quantity <= 1} variant="outline-secondary">-</Button>
        <FormControl value={quantity} onChange={handleChange} aria-label="Example text with two button addons" />
        <Button disabled={quantity === data.stock} onClick={() => handleQty(1)} variant="outline-secondary">+</Button>
      </InputGroup>
      {quantity === data.stock && <small style={{ color: 'red' }}>Only {data.stock} available</small>}
    </div >
  )
}

export default Index
