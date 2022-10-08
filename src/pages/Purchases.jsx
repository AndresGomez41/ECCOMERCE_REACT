import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import dateFormat from 'dateformat'

const Purchases = () => {

  const purchases = useSelector(state => state.purchases)
  

  const dispatch = useDispatch()


  useEffect( () => {
    dispatch(getPurchasesThunk())
  }, [])

  console.log(purchases)
  
  return (
    <div className='page-body'>
      <h2 className='page-title'>My purchases</h2>
      {purchases.map((cart) => (
        <div className="purchase-cont" key={cart.id}>
          <h4>{dateFormat(cart.createdAt, " mmmm d, yyyy")}</h4>
          <table>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>BRAND</th>
                <th>Qt</th>
                <th>PRICE</th>
              </tr>
            </thead>
            {cart.cart.products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td className="quantity">{product.productsInCart.quantity}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </table>
        </div>
      ))}
    </div>
  );
};

export default Purchases;