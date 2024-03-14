import { Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import { deleteProduct, increment } from '../app/slices/commerseSlice';
import DeleteIcon from '@mui/icons-material/Delete';
const CartProducts = () => {
  const store = useSelector((state) => state.products);
  let cartProducts = useSelector((state) => state.products.cartProducts);
  let priceProducts = useSelector((state) => state.products.price);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backPage = () => {
    navigate(-1);
  };

  const addHandler = (product) => {
    dispatch(increment(product));
    // console.log(product);
  };

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
    console.log(id);
  };

  const clearCartProducts = () => {
    cartProducts.length = 0;
    cartProducts = [];
    console.log(cartProducts);
  };
  console.log(store.cartProducts);
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
              <h3>
                Price:{' '}
                {cartProducts.length > 0
                  ? cartProducts.map(
                      (item) => (priceProducts += Number(item.price))
                    )
                  : `0`}
                $
              </h3>
            </div>
            {store.cartProducts.map((product) => {
              return (
                <div className="cardCart" key={product.id}>
                  <div className="product_image">
                    <img src={product.images[0]} alt="" />
                  </div>
                  <div className="product_title">
                    <p>{product.title}</p>
                  </div>
                  <div className="product_controllers">
                    <Button color="success">-</Button>
                    {/* <span>{product.count}</span> */}
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
