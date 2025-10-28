import React, { useEffect, useState, useContext } from 'react';
import { listby } from '../../functions/product';
import { Grid } from '@mui/material';
import ProductCardCreated from '../card/ProductCardCreated';
import LoadingCard from '../card/LoadingCard';
import { CartContext } from '../../functions/CartContext';
import { toast } from 'react-toastify'; 

const ProductCreated = ({ showGridCup = false, showGridProcess = false, showGridIngredient = false, showGridTopping = false }) => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    const [selectedItems, setSelectedItems] = useState({
        Cup: false,
        Process: false,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        await listby(0, 'detail2', 'desc')
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const handleAddToCart = (data, quantity = 1) => {
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
            toast.success(`เพิ่มสินค้า ${data.name} ลงตะกร้าแล้ว`, {
                position: "top-left",
                theme: "dark",
            });

            if (data.detail2 === 'Cup') {
                setSelectedItems(prevState => ({ ...prevState, Cup: true }));
            } else if (data.detail2 === 'Process') {
                setSelectedItems(prevState => ({ ...prevState, Process: true }));
            }

        } else {
            toast.error('กรุณาเลือกจำนวนสินค้า', {
                position: "top-left",
                theme: "dark",
            });
        }
    };

    const getCardColor = (index) => {
        const colors = ['#ffecb3', '#bdbdbd'];
        return colors[index % colors.length];
    };

    const GridCup = () => {
        return (
            <Grid
                container
                spacing={3}
                sx={{ mt: 3 }}
                justifyContent="center"
            >
                {loading
                    ? Array.from(new Array(product.length)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <LoadingCard />
                        </Grid>
                    ))
                    : product
                        .filter((item) => item.detail2 === "Cup")
                        .map((item, index) => (
                            <Grid item xs={12} sm={6} md={3} key={item._id}>
                                <ProductCardCreated
                                    data={item}
                                    bgColor={getCardColor(index)}
                                    hideQuantityControls={true}
                                    onProductSelect={(productData) => handleAddToCart(productData)}
                                    hideAddToCartButton={selectedItems.Cup}/>
                            </Grid>
                        ))
                }
            </Grid>
        );
    };

    const GridProcess = () => {
        const colors = ['#e8eaf6', '#f9bdbb', '#ffe0b2'];
        return (
            <Grid
                container
                spacing={3}
                sx={{ mt: 3 }}
                justifyContent="center"
            >
                {loading
                    ? Array.from(new Array(product.length)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <LoadingCard />
                        </Grid>
                    ))
                    : product
                        .filter((item) => item.detail2 === "Process")
                        .map((item, index) => (
                            <Grid item xs={12} sm={6} md={3} key={item._id}>
                                <ProductCardCreated
                                    data={item}
                                    bgColor={colors[index % colors.length]}
                                    hideQuantityControls={true}
                                    onProductSelect={(productData) => handleAddToCart(productData)}
                                    hideAddToCartButton={selectedItems.Process}/>
                            </Grid>
                        ))
                }
            </Grid>
        )
    }

    const GridIngredient = () => {
        return (
            <Grid
                container
                spacing={3}
                sx={{ mt: 3 }}
                justifyContent="center"
            >
                {loading
                    ? Array.from(new Array(product.length)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <LoadingCard />
                        </Grid>
                    ))
                    : product
                        .filter((item) => item.detail2 === "Ingredient")
                        .map((item) => (
                            <Grid item xs={12} sm={6} md={3} key={item._id}>
                                <ProductCardCreated
                                    data={item}
                                    hideImage={true}
                                    onProductSelect={(productData) => handleAddToCart(productData)} />
                            </Grid>
                        ))
                }
            </Grid>
        )
    }

    const GridTopping = () => {
        return (
            <Grid
                container
                spacing={3}
                sx={{ mt: 3 }}
                justifyContent="center"
            >
                {loading
                    ? Array.from(new Array(product.length)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <LoadingCard />
                        </Grid>
                    ))
                    : product
                        .filter((item) => item.detail2 === "Topping")
                        .map((item) => (
                            <Grid item xs={12} sm={6} md={3} key={item._id}>
                                <ProductCardCreated
                                    data={item}
                                    hideImage={true}
                                    bgColor="#ffe0b2"
                                    onProductSelect={(productData) => handleAddToCart(productData)} />
                            </Grid>
                        ))
                }
            </Grid>
        )
    }

    return (
        <>
            {showGridCup && <GridCup />}
            {showGridProcess && <GridProcess />}
            {showGridIngredient && <GridIngredient />}
            {showGridTopping && <GridTopping />}
        </>
    );
}

export default ProductCreated;
