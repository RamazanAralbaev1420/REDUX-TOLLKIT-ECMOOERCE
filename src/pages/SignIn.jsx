import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = ({ setToken }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function authHandle(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    axios
      .post('https://api.escuelajs.co/api/v1/auth/login', user)
      .then(({ data }) => {
        navigate('/')
        console.log(data.access_token);
        setToken(data.access_token);
        window.localStorage.setItem('token', data.access_token);
        window.localStorage.setItem('role', 'super');
      })
      .then((err) => console.log(err));
  }

  return (
    <div className="form-container">
      <form>
        <h2>Sign In</h2>
        <TextField
          id="outlined-password-input"
          label="text"
          type="text"
          sx={{ m: 2, width: '25ch' }}
          autoComplete="current-password"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button onClick={(e) => authHandle(e)} color="primary">
          Sign In
        </Button>
        <p>
          У вас ещё нету аккаунта?
          <Link to="/sign-up">
            <Button color="warning">Sign Up</Button>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
