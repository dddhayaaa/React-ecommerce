import axios from 'axios';
import { useEffect,useState } from 'react';
import './HomePage.css';
import { Header } from '../../components/Header'; 
import { ProductsGrid } from './ProductsGrid';

export function HomePage({cartItems,loadCart}) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
    const getHomeData = async () => {

        const response = await axios.get('/api/products')
        setProducts(response.data);

    };

    getHomeData();
    
     }, []);

    return (
        <>
        <title>Ecommerce</title>

            <Header cart={cartItems} /> 

            <div className="home-page">
                <ProductsGrid products={products} loadCart ={loadCart} > </ProductsGrid>
            </div>
</>
    );
}