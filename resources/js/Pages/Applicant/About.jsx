import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import '../../../css/Applicant/about.css';
import { FaTruckMoving, FaHeadset, FaCreditCard, FaBoxOpen, FaRecycle, FaBox, FaInfoCircle, FaMoneyBillAlt, FaPhoneAlt, FaSignOutAlt, FaUserEdit } from "react-icons/fa";

export default function Dashboard({ company_name }) {
    console.log('Company Name:',company_name);
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
                        <a href="/applicant/contact" className="sidebar-link">
                            <FaPhoneAlt className="icon" /> Contact
                        </a>
                    </li>
                    <li>
                        <a href="/applicant/edit-profile" className="sidebar-link">
                            <FaUserEdit className="icon" /> Edit Profile
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
                     <h1 className="company-name">
                         Welcome To <strong className="text-5xl">{company_name}</strong>
                     </h1>
 
                     {logoutMessage && (
                         <div className="logout-message">{logoutMessage}</div>
                     )}
                         <div className="main-section">
                             <div className="body-section">
                                 <h1 className="header-one">Let's surf for your desired products.</h1>
                                 <p className="header-two">Reach out today and start shopping !!!</p>
                                 <div className="button-section">
                                     <Link href="/applicant/contact">
                                     <PrimaryButton className="contact-btn">Contact</PrimaryButton>
                                     </Link>
                                     <Link href="/applicant/authdash">
                                     <PrimaryButton className="product-btn">Product</PrimaryButton>
                                     </Link>
                                 </div>
                             </div>
                             <div className="image-section">
                                 <img src="/company/aboutsus.jpg" alt="Image Here" className="image-container"/>
                             </div>
                         </div>
 
                         <div className="banner-section">
                             <Link href="/company/products/home" >
                             <h1 className="main-banner">SHOP NOW !!!</h1>
                             </Link>
                            
                             <div className="service-section">
                                 <h1 className="service-head">Our Services:</h1>
                                 <ul>
                                     <li>
                                         <Link className="service-link">
                                         <FaTruckMoving className="icons"/> Home Delivery
                                         </Link>
                                     </li>
                                 </ul>
                                 <ul>
                                     <li>
                                         <Link className="service-link">
                                             <FaHeadset className="icons"/> Customer Service 24/7
                                         </Link>
                                     </li>
                                 </ul>
                                 <ul>
                                     <li>
                                         <Link className="service-link">
                                         <FaCreditCard className="icons"/> Secure Online Payment
                                         </Link>
                                     </li>
                                 </ul>
                                 <ul>
                                     <li>
                                     <Link className="service-link">
                                         <FaBoxOpen className="icons"/> Post Sales Services
                                         </Link>
                                     </li>
                                 </ul>
                                 <ul>
                                     <li>
                                     <Link className="service-link">
                                         <FaRecycle className="icons"/> Subscription
                                         </Link>
                                     </li>
                                 </ul>
                             </div>
                         </div>
 
                <div className="features-section">
                    <div className="feature-cards">
                        <h2>Feature One :</h2>
                        <p>Boost your productivity with our top-notch tools.</p>
                    </div>
                    <div className="feature-cards">
                        <h2>Feature Two :</h2>
                        <p>Seamless collaboration for your entire team.</p>
                    </div>
                    <div className="feature-cards">
                        <h2>Feature Three :</h2>
                        <p>Secure and reliable solutions you can trust.</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
