import { Button, IconButton, TextField } from '@mui/material';
import { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const Profile = () => {
  const [titleVal, setTitleVal] = useState('');
  const [descrVal, setDescrVal] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backPage = () => {
    navigate(-1);
  };

  const addProduct = async () => {
    console.log('added');
    await dispatch(
      addProduct({
        images: [
          'https://upload.wikimedia.org/wikipedia/commons/8/8b/Cristiano_Ronaldo_WC2022_-_01_%28cropped%29.jpg',
        ],
        title: titleVal,
        description: descrVal,
      })
    );
  };
  return (
    <div className="profile">
      <div className="container">
        <IconButton onClick={backPage}>
          <ArrowBackIcon />
        </IconButton>
        <div className="addProduct">
          <h2>Add Product</h2>
          <div className="productInfo">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={titleVal}
              onChange={(e) => setTitleVal(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Multiline"
              multiline
              maxRows={3}
              value={descrVal}
              onChange={(e) => setDescrVal(e.target.value)}
            />
          </div>
          <Button onClick={addProduct} color="success">
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
