import { Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  increment,
  decrement,
  deleteProduct,
  priceProductsAll,
  clearProducts,
} from '../app/slices/cartProductsSlice';
import { useEffect } from 'react';
const CartProducts = () => {
  const store = useSelector((state) => state.cartProducts);
  let cartProducts = useSelector((state) => state.cartProducts.cartProducts);
  let priceProducts = useSelector((state) => state.cartProducts.price);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backPage = () => {
    navigate(-1);
  };

  const addHandler = (product) => {
    dispatch(increment(product));
  };
  const decHandler = (product) => {
    dispatch(decrement(product));
  };

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
    console.log(id);
  };

  const summPrice = () => {
    cartProducts.map((item) => {
      return (priceProducts += item.price * item.count);
    });
  };
  summPrice()



  const clearCartProducts = () => {
    dispatch(clearProducts());
  };
  return (
    <div>
      <div className="container">
        <IconButton onClick={backPage}>
          <ArrowBackIcon />
        </IconButton>
        <div className="cartProd">
          <div className="cardCartProduct">
            <div className="cartInfo">
              <h3>CartProducts</h3>
              <h3>Price: {cartProducts.length > 0 ? priceProducts : `0`}$</h3>
            </div>
            {store.cartProducts.map((product) => {
              return (
                <div className="cardCart" key={product.id}>
                  <div className="product_image">
                    <img src={product.images[0]} alt="" />
                  </div>
                  <div className="product_title">
                    <h4>{product.title}</h4>
                  </div>
                  <div className="product_price">
                    <h4>price:{product.price}$</h4>
                  </div>
                  <div className="product_controllers">
                    <Button color="success" onClick={() => decHandler(product)}>
                      -
                    </Button>
                    <span>{product.count}</span>
                    <Button color="success" onClick={() => addHandler(product)}>
                      +
                    </Button>
                    <IconButton onClick={() => deleteHandler(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}
            {cartProducts.length > 0 ? (
              <Button onClick={clearCartProducts}>clear Cart</Button>
            ) : (
              <h3>Cart is Empty :(</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
