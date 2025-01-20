import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import { FaSignOutAlt, FaBox } from "react-icons/fa";

export default function SpecificHome({ company }) {
    const {post} = useForm();
    const [companyDetails] = useState(company);

    const handleLogout = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to log out?")) {
            post(route('applicant.logout'));
        }
    };

    return (
        <div className="specific-home-container">
            <Head title="Company Dashboard" />
            <div className="sidebar">
                <div className="sidebar-header">{companyDetails.name}</div>
                <ul className="sidebar-menu">
                    <li><Link href="/applicant/products" className="sidebar-link"><FaBox /> Products</Link></li>
                    <li><a href="#" className="sidebar-link"><FaBox /> About</a></li>
                    <li><a href="#" className="sidebar-link"><FaBox /> Contact</a></li>
                </ul>
                <div className="logout-container">
                    <PrimaryButton onClick={handleLogout} className="logout-button">
                        <FaSignOutAlt /> Logout
                    </PrimaryButton>
                </div>
            </div>
            <div className="product-container">
                <h1>Welcome to your Company Product Page</h1>
                <div className="products">
                    {companyDetails.products && companyDetails.products.length > 0 ? (
                        companyDetails.products.map((product) => (
                            <div key={product.id} className="product-card">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>Price: Rs. {product.price}</p>
                                <Link href={`/applicant/buy/${product.id}`} className="buy-button">Buy</Link>
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
