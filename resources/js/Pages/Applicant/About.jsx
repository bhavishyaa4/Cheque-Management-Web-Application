import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import '../../../css/companyDashboard.css';
import { FaBox, FaInfoCircle, FaMoneyBillAlt, FaPhoneAlt, FaSignOutAlt } from "react-icons/fa";

export default function Dashboard({ company_name }) {
    const { post } = useForm();
    const [logoutMessage, setLogoutMessage] = useState("");

    const handleLogout = (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Are you sure you want to log out?");

        if (isConfirmed) {
            post(route('applicant.logout'), {
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
        <div className="user-container">
            <div className="sidebar">
                <Link href="/applicant/authdash" className="sidebar-header">Dashboard</Link>
                <ul className="sidebar-menu">
                    <li>
                        <Link href="/applicant/authdash" className="sidebar-link">
                            <FaBox className="icon" /> Products
                        </Link>
                    </li>
                    <li>
                        <a href="/applicant/about" className="sidebar-link">
                            <FaInfoCircle className="icon" /> About
                        </a>
                    </li>
                    <li>
                        <a href="/applicant/cheques" className="sidebar-link">
                            <FaMoneyBillAlt className="icon" />Cheque
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

            <div className="main-content">
                <Head title="Company Dashboard" />
                <h1 className="company-name">{company_name}</h1>
                {logoutMessage && (
                    <div className="logout-message">{logoutMessage}</div>
                )}

                <div className="banner-section">
                    <div className="banner">
                        <img src="/company/photo-1549637642-90187f64f420.jpg" alt="Banner 1" />
                        {/* <h2 className="banner-caption">Welcome to {company_name}</h2> */}
                    </div>
                    <div className="banner">
                        <img src="/company/photo-1504805572947-34fad45aed93.jpg" alt="Banner 2" />
                    </div>
                </div>   
                <div className="features-section">
                    <div className="feature-cards">
                        <h2>Feature One</h2>
                        <p>Boost your productivity with our top-notch tools.</p>
                    </div>
                    <div className="feature-cards">
                        <h2>Feature Two</h2>
                        <p>Seamless collaboration for your entire team.</p>
                    </div>
                    <div className="feature-cards">
                        <h2>Feature Three</h2>
                        <p>Secure and reliable solutions you can trust.</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
