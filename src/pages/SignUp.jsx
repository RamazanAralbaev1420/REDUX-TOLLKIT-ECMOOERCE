import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = ({ setUserId, setToken }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const name = useRef('');
  const signUpHandle = (e) => {
    e.preventDefault();
    const data = {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    };
    axios
      .post('https://reqres.in/api/register', data)
      .then(({ data }) => {
        navigate('/');
        setUserId(data.id);
        setToken(data.token);
        window.localStorage.setItem('userId', data.id);
        window.localStorage.setItem('token', data.token);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <form onSubmit={signUpHandle} action="">
        <h2>Sign Up</h2>
        <TextField
          sx={{ m: 1, width: '25ch' }}
          id="outlined-password-input"
          label="UserName"
          type="text"
          autoComplete="current-password"
          ref={name}
        />
        <TextField
          sx={{ m: 1, width: '25ch' }}
          id="outlined-password-input"
          label="Email"
          type="email"
          autoComplete="current-password"
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
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
        <Button onClick={signUpHandle}>Sign Up</Button>
        <p>
          У вас уже есть аккаунт?
          <Link to="/sign-in">
            {' '}
            <Button color="warning">Sign In</Button>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
