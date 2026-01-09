import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/Products/ProductList';
import ProductDetails from './pages/Products/ProductDetails';
import { Container, CssBaseline } from '@mui/material';

function App() {
    return (
        <Router>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
