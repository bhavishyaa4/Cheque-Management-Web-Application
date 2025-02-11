import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaDraftingCompass, FaSignOutAlt, FaTrash, FaUserEdit, FaUsers } from 'react-icons/fa';
import '../../../css/productSideBar.css';
import '../../../css/Employee/chequeHistory.css';

export default function Cheques({ cheques = [], name }) {

    const { post, delete:destroy } = useForm({});
    const [getEditing, setEditing] = useState(null);

    const handleEdit = (chequeId) => {
        setEditing(chequeId);
        window.location.href = `/employee/cheques/edit/${chequeId}`;
    }

    const deleteCheque = (chequeId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Cheque?");
        if(isConfirmed) {
            destroy(route('employee.applicant.cheque.delete',chequeId),{
                preserveScroll:true,
                onSuccess: () => {
                    alert('Cheque Deleted Successfully.');
                    window.location.href = "/employee/dashboard";
                },
                onError: () => {
                    alert('Failed to Delete Cheque.');
                }
            });
        };
    }

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if (isConfirmed) {
            post(route('employee.logout'));
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
        <div className="dashboard-container">
            <div className="sidebar">
                        <Link href='/employee/firstDash' className='sidebar-header'>
                            Employee Dashboard
                        </Link>
                <ul className='sidebar-menu'>
                    <li>
                        <Link href="/employee/dashboard" className='sidebar-link'>
                            <FaUsers className='icon' /> View Users
                        </Link>
                    </li>
                    <li>
                        <Link href="/employee/edit-profile" className='sidebar-link'>
                            <FaUserEdit className='icon' /> Edit Profile
                        </Link>
                    </li>
                            <li>
                                <Link href="/employee/tracker" className='sidebar-link'>
                                    <FaDraftingCompass className='icon'/> Tracker 
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
                {/* <h1>Cheque History of: {cheques.length > 0 && cheques[0].bearer_name}</h1> */}
                <h1>Cheque History of: {name}</h1>
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
                                {/* <p className="button">Status: {cheque.status}</p> */}
                                <p className={`button  rounded-md border px-3 py-1${getColorStatus(cheque.status)}`}>
                                    Status: {cheque.status}
                                </p>
                                {/* <a href={`/employee/cheques/edit/${cheque.id}`} className="edit-button">Edit</a> */}
                                <div className="form-actions">
                                        <PrimaryButton
                                        onClick={() => handleEdit(cheque.id)}
                                        className="edit-button"
                                        disabled={getEditing === cheque.id}>
                                        {getEditing === cheque.id ? 'Editing...' : 'Edit'}
                                    </PrimaryButton>
                                    <button className='delete-button' onClick={() => deleteCheque(cheque.id)}>
                                        <FaTrash className='deleted-icon' />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='no-cheque'>No cheques submitted yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
