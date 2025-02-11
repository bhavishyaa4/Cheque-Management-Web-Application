import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { FaInfoCircle, FaSignOutAlt, FaCheck, FaTimes } from "react-icons/fa";
import '../../../css/companyDashboard.css'
import '../../../css/SuperAdmin/adminHome.css'

const AdminDash = ({ company = [], admin_name, admin_id }) => {
    const { post } = useForm();
    const [companyList, setCompanyList] = useState(company);
    const [loadingApprove, setLoadingApprove] = useState(null); 
    const [loadingDisable, setLoadingDisable] = useState(null);

    console.log('Admin Name:', admin_name);
    console.log('Admin ID:', admin_id);

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            post(route('superadmin.logout'));
        }
    };

    const handleApprove = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to approve this company?");
        if (isConfirmed) {
            setLoadingApprove(id); 
            post(route('superadmin.approveCompany', { id }), {
                onSuccess: () => {
                    setLoadingApprove(null); 
                    window.location.href = '/superadmin/home';
                },
            });
        }
    };

    const handleDisable = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to disable this company?");
        if (isConfirmed) {
            setLoadingDisable(id); 
            post(route('superadmin.disableCompany', { id }), {
                onSuccess: () => {
                    setLoadingDisable(null); 
                    window.location.href = '/superadmin/home';
                },
            });
        }
    };

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="dashboard-container">
                <div className="sidebar">
                    <Link href="/superadmin/home" className="sidebar-header">Admin Dashboard</Link>
                    <ul className="sidebar-menu">
                        <li>
                            <Link href="/superadmin/sendmail" className="sidebar-link">
                                <FaInfoCircle className="icon" /> Send Email
                            </Link>
                        </li>
                    </ul>
                    <div className="logout-container">
                        <PrimaryButton onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt className="icon" /> Logout
                        </PrimaryButton>
                    </div>
                </div>
                <div className="company-container">
                    <h1 className="company-header">Company List</h1>
                    <div className="company-list">
                        {companyList.length > 0 ? (
                            companyList.map((company) => (
                                <div key={company.id} className="company-card">
                                    <h2><b>Name:</b> {company.name}</h2>
                                    <p className="email"><b>Email:</b> {company.email} </p>
                                    <p className="address"><b>Address:</b> {company.address} </p>
                                    <p className="phone"><b>Phone:</b> {company.phone} </p>
                                    <p className="status"><b>Status:</b> {company.status} </p>

                                    <div className="actions">
                                        <div className="action-buttons">
                                            <PrimaryButton 
                                                onClick={() => handleApprove(company.id)}
                                                disabled={loadingApprove === company.id}
                                            >
                                                <FaCheck className="approve"  /> {loadingApprove === company.id ? 'Approving...' : 'Approve'}
                                            </PrimaryButton>

                                            <PrimaryButton 
                                                onClick={() => handleDisable(company.id)}
                                                disabled={loadingDisable === company.id}
                                            >
                                                <FaTimes className="disable" /> {loadingDisable === company.id ? 'Disabling...' : 'Disable'}
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No companies available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDash;
