import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Button, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';



const ProductCardCreated = ({ data, hideImage, bgColor, hideAddToCartButton, hideQuantityControls, onProductSelect }) => {
    const [quantity, setQuantity] = useState(0);
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
        if (data.detail2 === 'Cup' || data.detail2 === 'Process') {
            setHasBeenSelected(true);
        }

        onProductSelect(data, quantity);
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
                        disabled={hasBeenSelected || (['Ingredient', 'Topping'].includes(data.detail2) && quantity <= 0)}
                    >
                        หยิบใส่ตะกร้า
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

export default ProductCardCreated;
