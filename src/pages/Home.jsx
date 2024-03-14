import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, allProductsStore } from '../app/slices/commerseSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.products.cartProducts);
  // const store = useSelector((state) => state.products);
  const [allProducts, setAllProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [age, setAge] = useState('All');
  const homeProducts = async () => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products`
      );

      setAllProducts(response.data);
      dispatch(allProductsStore(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  // Snackbar
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const addCartBtn = (product) => {
    setOpen(true);

    dispatch(addCart({ ...product, count: 1 }));
    console.log(product);
  };

  useEffect(() => {
    homeProducts();
  }, [age]);

  // select

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // ===================================

  return (
    <div className="home">
      <div className="container">
        <div className="searchAndCategories">
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">All</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="All"
                onChange={handleChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Clothes">Clothes</MenuItem>
                <MenuItem value="Shoes">Shoes</MenuItem>
                <MenuItem value="Electronics">Elektronics</MenuItem>
                <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="wrap">
          {allProducts.length > 0 ? (
            allProducts

              .filter((product) => {
                if (age !== 'All') {
                  return product.category.name === `${age}`;
                } else {
                  return product;
                }
              })
              .filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((product) => {
                return (
                  <Card
                    className="card"
                    sx={{ width: 270, height: 350 }}
                    key={product.id}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.images[0]}
                        alt={product.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.title.slice(0, 30)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description.slice(0, 50)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <div className="priceAndAdd">
                      <h4>Price: {product.price}$</h4>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          sx={{ grow: 1 }}
                          onClick={() => addCartBtn(product)}
                        >
                          add Cart
                        </Button>

                        <Snackbar
                          open={open}
                          autoHideDuration={1500}
                          onClose={handleClose}
                        >
                          <Alert
                            onClose={handleClose}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                          >
                            product added to Cart
                          </Alert>
                        </Snackbar>
                      </CardActions>
                    </div>
                  </Card>
                );
              })
          ) : (
            <div className="loader">
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
