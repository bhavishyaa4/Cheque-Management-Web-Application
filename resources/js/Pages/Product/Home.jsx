import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import '../../../css/productSideBar.css'
import PrimaryButton from '@/Components/PrimaryButton';
import {FaBox, FaUserTie, FaInfoCircle, FaPhoneAlt, FaSignOutAlt, FaPen, FaTrash } from "react-icons/fa";

export default function Home({ products = [] }) {
    const { delete: deleteProduct, processing } = useForm();
    const [productsList, setProductsList] = useState(products);
    console.log('Products:',products);
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

    const handleLogout = (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Are you sure you want to log out?");

        if (isConfirmed) {
            post(route('logout'), {
                onSuccess: (response) => {
                    console.log('Logout Response:', response);
                    setLogoutMessage(response.message || "You have logged out successfully!");
                },
                onError: (error) => {
                    console.error('Logout Failed:', error);
                    setLogoutMessage("Logout failed. Please try again.");
                }
            });
        }
    };

    return (
        <>
        <div className="dashboard-container">
            <Head title="Product Dashboard" />
            <div className="sidebar">
                <div className="sidebar-header">Dashboard</div>
                <ul className="sidebar-menu">
                    <li>
                        <Link href="/company/products" className="sidebar-link">
                            <FaBox className="icon" /> Products
                        </Link>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">
                            <FaUserTie className="icon" /> Employee
                        </a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">
                            <FaInfoCircle className="icon" /> About
                        </a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">
                            <FaPhoneAlt className="icon" /> Contact
                        </a>
                    </li>
                </ul>
                <div className="logout-container">
                    <PrimaryButton onClick={handleLogout} className="logout-button">
                        <FaSignOutAlt className="icon" /> Logout
                    </PrimaryButton>
                </div>
            </div>
        <div className="product-container">
            <h1>Product Dashboard</h1>
            <div className="product-list">
                {productsList.length > 0 ? (
                    productsList.map((product) => (
                        <div key={product.id} className="product-card">
                            <h2>{product.name}</h2>
                            {product.image && (
                                <img
                                    src={`/uploads/products/${product.image}`}
                                    alt={product.name}
                                    className="product-image"
                                />
                            )}
                            <p>{product.description}</p>
                            <p>Price: Rs.{product.price}</p>

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
    </div>
        </>
    );
}
