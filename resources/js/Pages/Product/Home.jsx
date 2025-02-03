import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import '../../../css/productSideBar.css';
import '../../../css/Product/productDashBoardPage.css';
import PrimaryButton from '@/Components/PrimaryButton';
import {FaBox, FaUserTie, FaInfoCircle, FaPhoneAlt, FaSignOutAlt, FaPen, FaTrash } from "react-icons/fa";

export default function Home({ products = [], company_id }) {
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
                <Link href="/company/home" className="sidebar-header">Dashboard</Link>
                <ul className="sidebar-menu">
                    <li>
                        <Link href="/company/products" className="sidebar-link">
                            <FaBox className="icon" /> Products
                        </Link>
                    </li>
                    <li>
                        <Link href={`/company/employees?company_id=${company_id}`} className="sidebar-link">
                            <FaUserTie className="icon" /> Employee
                        </Link>
                    </li>
                    <li>
                        <a href="/company/about" className="sidebar-link">
                            <FaInfoCircle className="icon" /> About
                        </a>
                    </li>
                    <li>
                        <a href="/company/contactus" className="sidebar-link">
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
                            <h2 className=""><b>Name: </b>{product.name}</h2>
                            {product.image && (
                                <img
                                    src={`/uploads/products/${product.image}`}
                                    alt={product.name}
                                    className="product-image"
                                />
                            )}
                            <p className="description"><b>Description:</b> {product.description}</p>
                            <p className="stock"><b>Stock: </b>{product.stock}</p>
                            <p className="price">Price Rs:<em>{product.price}</em></p>

                            <div className="actions">
                                <div className="action-buttons">
                                    <button>
                                        {/* <Link href={route('company.products.edit', product.id)} className="edit-button"> */}
                                        <Link
                                                href={`${route('company.products.edit', product.id)}?company_id=${company_id}`}
                                                className="edit-button">
                                            <FaPen />
                                            {processing ? 'Editing...' : 'Edit'}
                                        </Link>
                                    </button>

                                    <PrimaryButton
                                        onClick={() => handleDelete(product.id)}
                                        className="delete-button"
                                        disabled={processing}>
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
