import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TablePagination, Typography, Chip, Box, Avatar, Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import { client } from '../../apiClient';
import { ProductDetailsForListDto } from '../../client';

const ProductList = () => {
    const [products, setProducts] = useState < ProductDetailsForListDto[] > ([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchProducts = async () => {
        try {
            const skip = page * rowsPerPage;
            const response = await client.getProducts(rowsPerPage, skip);
            setProducts(response.products ?? []);
            setTotal(response.total);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, rowsPerPage]);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
            <Typography variant="h4" gutterBottom>Product Catalog</Typography>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Preview</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Tags</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id} hover>
                                <TableCell>
                                    <Avatar src={product.thumbnail} variant="rounded" sx={{ width: 56, height: 56 }} />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{product.title}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                        {product.tags?.map(tag => (
                                            <Chip key={tag} label={tag} size="small" />
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        to={`/product/${product.id}`}
                                    >
                                        Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ProductList;