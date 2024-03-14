import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import AllProduct from './pages/AllProduct';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import { useState } from 'react';
import Profile from './pages/Profile';
import CartProducts from './pages/CartProducts';

function App() {
  const [userId, setUserId] = useState(window.localStorage.getItem('userId'));
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [role, setRole] = useState(window.localStorage.getItem('role'));


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/all-products" element={<AllProduct />} />
        {!token ? (
          <>
            <Route
              path="/sign-in"
              element={<SignIn setUserId={setUserId} setToken={setToken} />}
            />
            <Route
              path="/sign-up"
              element={
                <SignUp
                  setUserId={setUserId}
                  setToken={setToken}
                  setRole={setRole}
                />
              }
            />
          </>
        ) : (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path='/cart' element={<CartProducts />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
