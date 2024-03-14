import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';

export default function ButtonAppBar() {
  const cartProducts = useSelector((state) => state.products.cartProducts);
  const [userId, setUserId] = React.useState(
    window.localStorage.getItem('userId')
  );
  const [token, setToken] = React.useState(
    window.localStorage.getItem('token')
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('sign in');
  }, [token, userId]);

  const [anchorEl, setAnchorEl] = React.useState();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('role');
    navigate('/sign-in');
  };

  const openCart = () => {
    navigate('/cart');
  };

  return (
    <div className="navHead">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <div className="containerHeader">
            <Toolbar className="toolbar">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Link to="/">Logo</Link>
              </IconButton>
              <Typography
                component="div"
                sx={{ flexGrow: 1, mt: 1, ml: 1 }}
              ></Typography>
              {!userId && !token ? (
                <>
                  <Link to="sign-up">
                    <Button color="inherit">Sign Up</Button>
                  </Link>
                  <Link to="sign-in">
                    <Button color="inherit">Sign IN</Button>
                  </Link>
                </>
              ) : (
                <div className="signed">
                  <div className="cartIconCount">
                    <IconButton onClick={openCart}>
                      <ShoppingCartOutlinedIcon color="inherit" />
                    </IconButton>
                    <h5>{cartProducts.length}</h5>
                  </div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem className="profile" onClick={handleClose}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </div>
        </AppBar>
      </Box>
    </div>
  );
}
