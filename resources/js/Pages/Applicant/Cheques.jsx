import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaBox, FaInfoCircle, FaPhoneAlt, FaSignOutAlt } from 'react-icons/fa';
import '../../../css/Applicant/applicantSideBar.css';
import '../../../css/Applicant/cheque.css';

export default function Cheques({ cheques = [], company_id  }) {
    const { post } = useForm({});
    console.log('Cheques:', cheques)

    const handleLogout = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to logout?')) {
            post(route('applicant.logout'));
        }
    };

    return (
        <div className="cheques-container">
            <Head title="Cheques Dashboard" />
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
                        <a href="/applicant/about" className="sidebar-link">
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
                            <p className="heads">
                                Cheque for{' '}
                                {cheque.products.length > 0
                                ? cheque.products.map((product) => product.name).join(', ')
                                 : 'No products'}
                                </p>
                            <p className="bodys">Amount: Rs. {cheque.amount}</p>
                            <p className="bodys">Bank Name: {cheque.bank_name}</p>
                            <p className="bodys">Account Holder Name: {cheque.bearer_name}</p>
                            <p className="bodys">Account Number: {cheque.account_number}</p>
                            <p className="bodys">Collected Date: {cheque.collected_date}</p>
                            <p className="button">Status: {cheque.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No cheques submitted yet.</p>
                )}
            </div>
        </div>
    );
}
