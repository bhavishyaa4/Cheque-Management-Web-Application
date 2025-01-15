import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import { FaBox, FaPen, FaTrash } from "react-icons/fa";

export default function Home({ products = [] }) {
    const { delete: deleteProduct, processing } = useForm();
    const [productsList, setProductsList] = useState(products);

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            deleteProduct(route('company.products.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    setProductsList((prevList) => prevList.filter((product) => product.id !== id));
                },
                onError: () => {
                    alert("Failed to delete the product. Please try again.");
                },
            });
        }
    };

    return (
        <div className="dashboard-container">
            <Head title="Product Dashboard" />
            <h1>Product Dashboard</h1>

            <div className="product-list">
                {productsList.length > 0 ? (
                    productsList.map((product) => (
                        <div key={product.id} className="product-card">
                            <h2>{product.name}</h2>
                            {product.image && (
                                <img
                                    src={`/products/${product.image}`} // Ensure path is correct
                                    alt={product.name}
                                    className="product-image"
                                />
                            )}
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>

                            <div className="actions">
                                <div className="action-buttons">
                                    <PrimaryButton>
                                        <a href={route('company.products.edit', product.id)} className="edit-button">
                                            <FaPen /> Edit
                                        </a>
                                    </PrimaryButton>

                                    <PrimaryButton
                                        onClick={() => handleDelete(product.id)}
                                        className="delete-button"
                                        disabled={processing}
                                    >
                                        <FaTrash /> Delete
                                    </PrimaryButton>
                                </div>
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
