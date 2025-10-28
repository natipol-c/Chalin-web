import React, { useEffect, useState } from 'react';
import { listby } from '../../functions/product';
import { Grid } from '@mui/material';
import ProductCard from '../card/ProductCard';
import LoadingCard from '../card/LoadingCard';

const ProductNew = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await listby(4, 'price', 'desc')
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      {loading
        ? <LoadingCard count={4}/>
        : product.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item._id}>
              <ProductCard data={item} bgColor="#ffe0b2"/>
            </Grid>
          ))
      }
    </Grid>
  );
};

export default ProductNew;
