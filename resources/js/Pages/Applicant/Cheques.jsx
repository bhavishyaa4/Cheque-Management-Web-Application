import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaBox, FaInfoCircle, FaMoneyBillAlt, FaPhoneAlt, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import '../../../css/Applicant/applicantSideBar.css';
import '../../../css/Applicant/cheque.css';

export default function Cheques({ cheques = [], company_id  }) {
    const { post } = useForm({});
    console.log('Cheques:', cheques);
    console.log('Company ID:', company_id);

    const handleLogout = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to logout?')) {
            post(route('applicant.logout'));
        }
    };

    const getColorStatus = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-500 border-yellow-400';
            case 'Hold': return 'bg-orange-100 text-orange-500 border-orange-400';
            case 'Cancelled': return 'bg-red-100 text-red-500 border-red-400';
            case 'Completed': return 'bg-green-100 text-green-500 border-green-400';
            default: return 'bg-gray-100 text-gray-500 border-gray-400';
        }
    };

    return (
        <div className="cheques-container">
            <Head title="Cheques Dashboard" />
            <div className="sidebar">
                <Link href="/applicant/authdash" className="sidebar-header">
                    Dashboard
                </Link>
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
                            {/* <p className="button">Status: {cheque.status}</p> */} 
                            <p className={`button  rounded-md border px-3 py-1${getColorStatus(cheque.status)}`}>
                                    Status: {cheque.status}
                                </p>                                           
                        </div>
                    ))
                ) : (
                    <p>No cheques submitted yet.</p>
                )}
            </div>
        </div>
    );
}
