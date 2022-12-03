import React from 'react';
import '../css/cart.css'

function Cart({ product }) {

    return (
        <div className="Cart-item">
            <div className="cart-item-thumbnail">
                <img src={product.thumbnail} alt="Product Thumbnail" />
            </div>
            <div className="cart-item-details">
                <h6>{product.title}</h6>
                <div className="price">
                    Price : ${(product.price * (100 - product.discountPercentage) / 100).toFixed(2)}
                </div>
                <div>Qty : {product.quantity}</div>
            </div>
        </div>
    );
}

export default Cart;