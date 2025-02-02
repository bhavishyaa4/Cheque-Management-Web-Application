import React from "react";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import { FaUserTie, FaInfoCircle, FaPhoneAlt, FaSignOutAlt, FaPlus, FaBox } from "react-icons/fa";
import '../../../css/productSideBar.css';
import '../../../css/Product/productHomePage.css';

export default function Control({company_id}) {
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
    <Head title="Product Control" />
    <div className="dashboard-container">
        <div className="sidebar">
                <div className="sidebar-header">Dashboard</div>
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
        <div className="product-control">
            <h1>Product Control</h1>
            <div className="product-actions">
                <Link href="/company/products/create" className="option-button">
                    <PrimaryButton>
                        <FaPlus className="icon" /> Create New Product
                    </PrimaryButton>
                </Link>

                <Link href="/company/products/home" className="option-button">
                    <PrimaryButton>
                        <FaBox className="icon" /> View All Products
                    </PrimaryButton>
                </Link>
            </div>
        </div>
        </div>
    </>
    );
}
