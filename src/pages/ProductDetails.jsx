import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addProductCartThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetails = () => {

  const allProducts = useSelector(state => state.products)
  const [ productDetail , setProductDetail ] = useState([])
  const [ suggestedProducts , setSuggestedProducts ] = useState([])
  const [ counter, setCounter ] = useState(1)

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect( () => {
    dispatch(getProductsThunk())
  }, [] )

  useEffect( () => {
    const product = allProducts.find( item => item.id === Number(id))
    setProductDetail(product) 

    const suggestedItems = allProducts.filter( item => item.category.id === product.category.id && item.id !== product.id)
    setSuggestedProducts(suggestedItems)

  } , [ allProducts, id ] )

  const addProduct = () => {
    const productCart = {
      id: productDetail.id,
      quantity: counter
    }
    console.log(productCart)
    dispatch(addProductCartThunk(productCart))
    alert('product added to cart')
  }
  
  

  return (
    <div className="page-body">
      <h1 className="page-title">Product Details</h1>
      <div className="product-detail-cont">
        <div className='img-cont'>
          <img src={productDetail.productImgs?.[0]} />
        </div>
        <div className="product-info-cont">
          <h2>{productDetail?.title}</h2>
          <h5>{productDetail.category?.name}</h5>
          <p>{productDetail.description}</p>
          <h2>$ {productDetail.price}</h2>
          <div className="counter-cont">
            <button
              className="decrement-btn"
              onClick={() => (counter <= 1 ? counter : setCounter(counter - 1))}
            >
              -
            </button>
            <div>{counter}</div>
            <button
              className="increment-btn"
              onClick={() => setCounter(counter + 1)}
            >
              +
            </button>
          </div>
          <button onClick={addProduct} className="add-cart">Add to cart</button>
        </div>
      </div>
     
      <h2 className='page-title'>Suggested items</h2>
      <ul className="suggested-items-cont">
        {suggestedProducts.map((product) => (
          <li
            className="suggested-card"
            onClick={() => navigate(`/product/${product.id}`)}
            key={product.id}
          >
            <img src={product?.productImgs[0]} />
            <h5>{product.title}</h5>
            <h5>$ {product.price}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetails;



