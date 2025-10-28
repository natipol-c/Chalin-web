import React, { useState, useContext } from 'react';
import { Card, CardContent, Typography, IconButton, Button, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { CartContext } from '../../functions/CartContext';
import { toast } from 'react-toastify';


const ProductCard = ({ data, hideImage, bgColor, hideAddToCartButton,hideQuantityControls, onProductSelect }) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useContext(CartContext);
  const [hasBeenSelected, setHasBeenSelected] = useState(false);

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (hideQuantityControls) {
      const productData = {
        id: data._id,
        name: data.name,
        price: data.price,
        image: data.file,
        detail: data.detail,
        quantity: 1,
      };
  
      addToCart(productData);
  
      if (onProductSelect) {
        onProductSelect(productData);
      }
        setHasBeenSelected(true)

    } else {
      if (quantity > 0) {
        const productData = {
          id: data._id,
          name: data.name,
          price: data.price,
          image: data.file,
          detail: data.detail,
          quantity: quantity,
        };
  
        addToCart(productData);
  
        if (onProductSelect) {
          onProductSelect(productData);
        }
        toast.success(`เพิ่มสินค้า ${data.name} ลงตะกร้าแล้ว`, {
          position: "top-left",
          theme: "dark",
      });
  
        setQuantity(0);
      } else {
        toast.error('กรุณาเลือกจำนวนสินค้า', {
          position: "top-left",
          theme: "dark",
        });
      }
    }
  };

  return (
    <Card sx={{ backgroundColor: bgColor || '#FFF7E0', borderRadius: '20px', padding: '10px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {!hideImage && (
          <img
            src={`http://localhost:5000/uploads/${data.file}`}
            alt={data.name}
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'contain',
              borderRadius: '10px'
            }}
          />
        )}
      </Box>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>
          {data.name}
        </Typography>

        <Typography variant="body2" sx={{ fontFamily: 'Kanit, sans-serif', color: '#757575' }}>
          {data.detail}
        </Typography>

        <Typography variant="h5" sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>
          {data.price} บาท
        </Typography>
        {!hideQuantityControls && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
          <IconButton onClick={handleDecrease}>
            <RemoveCircleOutlineIcon />
          </IconButton>

          <Typography variant="h6" sx={{ mx: 1 }}>{quantity}</Typography>

          <IconButton onClick={handleIncrease}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
        )}

        {!hideAddToCartButton && (
          <Button
            variant="contained"
            color="warning"
            sx={{ mt: 2, borderRadius: '20px', fontFamily: 'Kanit, sans-serif' }}
            onClick={handleAddToCart}
            disabled={hasBeenSelected}
            
          >
            หยิบใส่ตะกร้า
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
