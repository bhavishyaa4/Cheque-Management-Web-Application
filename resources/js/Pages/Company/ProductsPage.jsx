import React from 'react';
import '../../../css/productSideBar.css';
import '../../../css/Product/productHomePage.css'
import { Link, Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaCog, FaBox, FaUserTie, FaInfoCircle, FaPhoneAlt, FaSignOutAlt } from 'react-icons/fa';

export default function ProductsPage() {
    const { post } = useForm();
    
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
        <Head title="Products Dashboard" />
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
        <div className="products-page">
            <h1>Products Page</h1>
            <div className="product-options">
                <Link href="/company/products/home" className="option-button">
                    <PrimaryButton>
                        <FaBox className="icon" /> Product Dashboard
                    </PrimaryButton>
                </Link>
                <Link href="/company/products/control" className="option-button">
                    <PrimaryButton>
                        <FaCog className="icon" /> Product Control
                    </PrimaryButton>
                </Link>
            </div>
        </div>
        </div>
        </>
    );
}
