import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaSignOutAlt, FaUserEdit, FaUsers } from 'react-icons/fa';
import '../../../css/companyDashboard.css';
import '../../../css/Employee/chequeHistory.css';

export default function Cheques({ cheques = [] }) {

    const { post } = useForm({});

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if (isConfirmed) {
            post(route('logout'));
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="sidebar-header">Employee Dashboard</div>
                <ul className='sidebar-menu'>
                    <li>
                        <Link href="/employee/dashboard" className='sidebar-link'>
                            <FaUsers className='icon' /> View Users
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className='sidebar-link'>
                            <FaUserEdit className='icon' /> Edit Profile
                        </Link>
                    </li>
                </ul>
                <div className="logout-container">
                    <PrimaryButton onClick={handleLogout} className='logout-button'>
                        <FaSignOutAlt className='icon' /> Logout
                    </PrimaryButton>
                </div>
            </div>
            <div className="cheques-container">
                <Head title="Cheques Dashboard" />
                <h1>Cheque History of: {cheques.length > 0 && cheques[0].bearer_name}</h1>
                <div className="cheque-list">
                    {cheques.length > 0 ? (
                        cheques.map((cheque) => (
                            <div key={cheque.id} className="cheque-card">
                                <p className="heads">
                                    Cheque for{' '}
                                    {cheque.products && cheque.products.length > 0
                                        ? cheque.products.map((product) => product.name).join(', ')
                                        : 'No products'}
                                </p>
                                <p className="bodys">Amount: Rs. {cheque.amount}</p>
                                <p className="bodys">Bank Name: {cheque.bank_name}</p>
                                <p className="bodys">Account Holder Name: {cheque.bearer_name}</p>
                                <p className="bodys">Account Number: {cheque.account_number}</p>
                                <p className="bodys">Collected Date: {cheque.collected_date}</p>
                                <p className="button">Status: {cheque.status}</p>
                                <a href={`/employee/cheques/edit/${cheque.id}`} className="edit-button">Edit</a>
                            </div>
                        ))
                    ) : (
                        <p>No cheques submitted yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
