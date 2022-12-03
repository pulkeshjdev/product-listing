import React from 'react';
import Rating from '@mui/material/Rating';
import '../css/product.css'

export default function Product({ product, actionButtons }) {
    


    return (
        <div className="Product-item">
            <div className="Item-thumbnail">
                <img src={product.thumbnail} alt="Product Thumbnail" />
            </div>
            <div className="Item-details">
                <h2>{product.title}</h2>
                <Rating name="read-only" value={product.rating} readOnly />
                <div className="price">
                    
                    <div className="original-price">
                        ${product.price}
                    </div>
                    &nbsp;${(product.price * (100 - product.discountPercentage) / 100).toFixed(2)}
                    <strong className="discount">
                        &nbsp;
                        {(product.discountPercentage).toPrecision(2)}
                        % off
                    </strong>
                </div>
                <div className="description">{product.description}</div>
                {(product.stock < 50) ? <div><strong>Hurry!only a few items left</strong></div> : null}
                {actionButtons}
            </div>
        </div>
    )
}