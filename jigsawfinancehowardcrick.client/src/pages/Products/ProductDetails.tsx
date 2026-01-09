import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Typography, Grid, Paper, Box, Chip, Divider,
    Button, CircularProgress, ImageList, ImageListItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { client } from '../../apiClient';
import { ProductDetailsDto } from '../../client';

const ProductDetails = () => {
    const { id } = useParams < { id: string } > ();
    const navigate = useNavigate();
    const [product, setProduct] = useState < ProductDetailsDto | null > (null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (id) {
                    const data = await client.getProductDetails(parseInt(id));
                    setProduct(data);
                }
            } catch (error) {
                console.error("Error fetching details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
    if (!product) return <Typography>Product not found.</Typography>;

    return (
        <Box>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                Back to Products
            </Button>

            <Paper sx={{ p: 4 }}>
                <Grid container spacing={4}>
                    {product.images != null && product.images.length > 0 &&
                    (<Grid>
                        <Typography variant="h6" gutterBottom>Product Images</Typography>
                        <ImageList cols={2} rowHeight={200} gap={8}>
                            {product.images.map((img, index) => (
                                <ImageListItem key={index}>
                                    <img src={img} alt={`${product.title}`} loading="lazy" style={{ borderRadius: '8px', objectFit: 'cover', height: '100%' }} />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                    )}
                    <Grid>
                        <Typography variant="h3" component="h1" gutterBottom>
                            {product.title}
                        </Typography>

                        <Typography variant="h4" color="primary" gutterBottom>
                            ${product.price.toFixed(2)}
                        </Typography>

                        <Box sx={{ my: 2 }}>
                            {product.tags?.map(tag => (
                                <Chip key={tag} label={tag} sx={{ mr: 1 }} color="secondary" variant="outlined" />
                            ))}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">Description</Typography>
                        <Typography variant="body1" component="p" color="text.secondary">
                            {product.description || "No description available."}
                        </Typography>

                        <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                            <Typography variant="subtitle2" color="text.secondary">Shipping Information</Typography>
                            <Typography variant="body2">{product.shippingInformation || "Standard shipping applies."}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ProductDetails;