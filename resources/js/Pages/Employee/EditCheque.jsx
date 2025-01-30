import React, { useState, useEffect } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { FaSignOutAlt, FaUserEdit, FaUsers } from 'react-icons/fa';
import '../../../css/companyDashboard.css';
import '../../../css/Employee/chequeEdit.css';
import PrimaryButton from '@/Components/PrimaryButton';

export default function EditCheque({ cheque }) {
    const { data, post, setData, put, processing, errors } = useForm({
        amount: cheque.amount,
        status: cheque.status,
        collected_date: cheque.collected_date,
    });

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if(isConfirmed){
            post(route('logout'));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/employee/cheques/update/${cheque.id}`);
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="sidebar-header">Employee Dashboard</div>
                <ul className='sidebar-menu'>
                    <li>
                        <Link href='#' className='sidebar-link'>
                            <FaUsers className='icon'/> View Users
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className='sidebar-link'>
                            <FaUserEdit className='icon'/> Edit Profile
                        </Link>
                    </li>
                </ul>
                <div className="logout-container">
                    <PrimaryButton onClick={handleLogout}className='logout-button'>
                        <FaSignOutAlt className='icon'/> Logout
                    </PrimaryButton>
                </div>
            </div>
            <div className="edit-cheque-container">
                <Head title="Edit Cheque" />
                <h1>Edit Cheque</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                        />
                        {errors.amount && <div className="error">{errors.amount}</div>}
                    </div>

                    <div>
                        <label>Status</label>
                        <select
                            name="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="hold">Hold</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="ok">Completed</option>
                        </select>
                        {errors.status && <div className="error">{errors.status}</div>}
                    </div>

                    <div>
                        <label>Collected Date</label>
                        <input
                            type="date"
                            name="collected_date"
                            value={data.collected_date}
                            onChange={(e) => setData('collected_date', e.target.value)}
                        />
                        {errors.collected_date && <div className="error">{errors.collected_date}</div>}
                    </div>

                    <button type="submit" disabled={processing}>
                        Update Cheque
                    </button>
                </form>
            </div>
        </div>
    );
}
