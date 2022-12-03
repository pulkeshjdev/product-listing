import React, { useState, useEffect } from 'react';
import '../css/productList.css'
import axios from 'axios';
import Product from './product';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Cart from './cart';

export default function ProductList ({updateFilter, filter}) {

    let [cart, setCart] = useState([]);
    let [products, setProducts] = useState([]);
    let [uniqueBrand, setUniqueBrand] = useState([]);
    let [uniqueCategory, setUniqueCategory] = useState([]);
    let [categorisedProducts, setCategorisedProducts] = useState({});
    let cartTotal = 0;
    
    const getProductList = async (limit) => {
        let { data } = await axios.get(`https://dummyjson.com/products?limit=${limit}`);
        setProducts(data.products);
        
        let categories = [];
        let brands = [];
        data.products.forEach(obj => {
            categories.push(obj.category);
            brands.push(obj.brand);
        });
        setUniqueBrand([...new Set(brands)]);
        setUniqueCategory([...new Set(categories)]);
        let tempObj = {};
        data.products.forEach(obj => {
            if (!tempObj[obj.category])
                tempObj[obj.category] = [];
            tempObj[obj.category].push(obj);
        });
        setCategorisedProducts(tempObj)

        return data.products;
    };

    const calcDiscountPrice = (product) => {
        return (product.price * (100 - product.discountPercentage) / 100).toFixed(2)
    }

    cart.forEach(product => { 
        cartTotal += calcDiscountPrice(product)*1;
    })

    const filterCategory = (category) => { 
        if (filter.category.length === 0)
            return true;
        return filter.category.includes(category);
    }
    
    const filterBrand = (brand) => { 
        if (filter.brand.length === 0)
            return true;
        return filter.brand.includes(brand);
    }

    const sortProducts = (p1, p2) => {
        switch (filter.sort) {
            case "Rating": return (p2.rating - p1.rating);
            case "Discount": return (p2.discountPercentage - p1.discountPercentage);
            case "Price : High to Low": return (calcDiscountPrice(p2) - calcDiscountPrice(p1));
            case "Price : Low to High": return (calcDiscountPrice(p1) - calcDiscountPrice(p2));
            default: return 1;
        }
    }

    const updateCart = (value) => {
        if (value.quantity)
            cart.filter(product => product.id === value.id).forEach(product => product.quantity++);
        else {
            value["quantity"] = 1;
            setCart(prevState => [...prevState, value]);
        }
    }

    useEffect(() => {
        (async () => {
            let productList = await getProductList(100);
            setProducts(productList);
        })();
        
    }, []);

    useEffect(() => {
        updateFilter(uniqueCategory, uniqueBrand);
    }, [products])
    

    return (
        <div className="Shopping">
            <div className="Product-listing">
                <h1 className="highlight">Product Listing</h1>
                <hr />
                <div>
                    <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {uniqueCategory.filter(filterCategory).map((category, index) =>
                            <TreeItem key={index} nodeId={`${index}`} label={category}>
                                {categorisedProducts[category].length===0 ? <div>No Items Found</div> : null}
                                {categorisedProducts[category].filter(product => filterBrand(product.brand)).sort(sortProducts).map(product => (
                                    <div key={product.id} className="Product">
                                        <Product
                                            product={product}
                                            updateCart={updateCart}
                                            actionButtons={<button type="button" className="btn btn-warning" onClick={()=>updateCart(product)}>Add to Cart</button>}
                                        />
                                    </div>
                                ))}
                            </TreeItem>
                        )}
                    </TreeView>
                </div>
            </div>
            <div className="Cart">
                <div className="Cart-listing">
                    <h1 className="highlight">Shopping Cart</h1>
                    <hr />
                    {cart.map(product => 
                        <div className="cart-item">
                            <Cart
                                product={product}
                            />
                        </div>
                    )}
                    <div className="cart-total">
                        <h2>Cart Total : ${cartTotal.toFixed(2)}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}