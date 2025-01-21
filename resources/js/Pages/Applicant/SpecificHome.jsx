import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { FaBox, FaInfoCircle, FaPhoneAlt, FaSignOutAlt } from "react-icons/fa";
import '../../../css/Applicant/authDash.css';
import'../../../css/Applicant/applicantSideBar.css';

export default function SpecificHome({ company }) {
    const { post } = useForm();
    const [companyDetails] = useState(company);
    const [selectedQuantities, setSelectedQuantities] = useState({});

    const handleLogout = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to log out?")) {
            post(route("applicant.logout"));
        }
    };

    const handleQuantityChange = (productId, stock, price, value) => {
        const quantity = Math.min(Math.max(0, value), stock);
        setSelectedQuantities((prev) => ({
            ...prev,
            [productId]: {
                quantity,
                amount: quantity * price,
            },
        }));
    };

    return (
        <div className="specific-home-container">
            <Head title="Company Dashboard" />
            <div className="sidebar">
                <div className="sidebar-header">{companyDetails.name}</div>
                <ul className="sidebar-menu">
                    <li>
                        <Link href="/applicant/products" className="sidebar-link">
                            <FaBox className="icon"/> Products
                        </Link>
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
                        <FaSignOutAlt /> Logout
                    </PrimaryButton>
                </div>
            </div>
            <div className="product-container">
                <h1>Welcome to {companyDetails.name} Product Page</h1>
                <div className="products">
                    {companyDetails.products && companyDetails.products.length > 0 ? (
                        companyDetails.products.map((product) => (
                            <div key={product.id} className="product-card">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>Price: Rs. {product.price}</p>
                                <p>Available Stock: {product.stock}</p>
                                {product.image && (
                                            <img
                                                src={`/uploads/products/${product.image}`} 
                                                alt={product.name}
                                                className="product-image"
                                            />
                                        )}

                                <div className="quantity-selector">
                                    <label htmlFor={`quantity-${product.id}`}>Select Quantity:</label>
                                    <input
                                        type="number"
                                        id={`quantity-${product.id}`}
                                        value={selectedQuantities[product.id]?.quantity || 0}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                product.id,
                                                product.stock,
                                                product.price,
                                                parseInt(e.target.value, 10) || 0
                                            )
                                        }
                                        min="0"
                                        max={product.stock}
                                        className="quantity-input"
                                    />
                                </div>

                                <p>
                                    Total Amount: Rs.{" "}
                                    {selectedQuantities[product.id]?.amount || 0}
                                </p>

                                <Link
                                    href={`/applicant/buy/${product.id}`}
                                    className="buy-button"
                                    data={{
                                        amount: selectedQuantities[product.id]?.amount || 0,
                                    }}
                                >
                                    Buy
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
