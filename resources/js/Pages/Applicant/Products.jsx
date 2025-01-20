import React from 'react';
import { Link, Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaBox } from 'react-icons/fa';

export default function Products({ products = [] }) {
    return (
        <div className="products-container">
            <Head title="Products" />
            <h1>Available Products</h1>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
                            <h3>{product.name}</h3>
                            {product.image && (
                                <img
                                    src={`/uploads/products/${product.image}`}
                                    alt={product.name}
                                    className="product-image"
                                />
                            )}
                            <p>{product.description}</p>
                            <p>Price: Rs. {product.price}</p>
                            <div className="actions">
                                <Link href={`/applicant/buy/${product.id}`} className="buy-button">
                                    <PrimaryButton>Buy</PrimaryButton>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
}
