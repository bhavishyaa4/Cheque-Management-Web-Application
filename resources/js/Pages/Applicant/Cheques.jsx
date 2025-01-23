import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {FaBox, FaInfoCircle, FaPhoneAlt, FaSignOutAlt} from 'react-icons/fa';
import '../../../css/Applicant/applicantSideBar.css';
import '../../../css/Applicant/cheque.css';

export default function Cheques({ cheques = [] }) {
    const {post} = useForm({});

    const handleLogout = (e) => {
        e.preventDefault();
        if(window.confirm("Are you sure you want to logout?")){
            post(route("applicant.logout"));
        }
    };
    return (
        <div className="cheques-container">
            <Head title="Cheques Dashboard" />
            {/* <h1>Your Cheques</h1> */}
            <div className="sidebar">
                <div className="sidebar-header">
                    Dashboard
                </div>
                <ul className="sidebar-menu">
                    <li>
                        <Link href="/applicant/authdash" className="sidebar-link">
                            <FaBox className="icon" /> Products
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
                    <button onClick={handleLogout} className="logout-button">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>
            <div className="cheque-list">
                {cheques.length > 0 ? (
                    cheques.map((cheque) => (
                        <div key={cheque.id} className="cheque-card">
                            <h3>Cheque for {cheque.product.name}</h3>
                            <p>Amount: Rs. {cheque.amount}</p>
                            <p>Bank Name: {cheque.bank_name}</p>
                            <p>Account Holder Name: {cheque.bearer_name}</p>
                            <p>Account Number: {cheque.account_number}</p>
                            <p>Collected Date: {cheque.collected_date}</p>
                            <p>Status: {cheque.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No cheques submitted yet.</p>
                )}
            </div>
        </div>
    );
}
