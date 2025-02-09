import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { FaBox, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";

const AdminDash = ({company = [] }) => {
    const {post} = useForm();
    console.log('Companies:',company)
    const [companyList, setCompanyList] = useState(company);

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if(isConfirmed){
            post(route('superadmin.logout'));
        };
    };

    return (
        <>
            <Head title="Admin Dashboard"/>
            <div className="dashboard-board-container">
                <div className="sidebar">
                    <Link href="/superadmin/home" className="sidebar-header">Admin Dashboard</Link>
                    <ul className="sidebar-menu">
                        <li>
                            <Link href="/superadmin/home">
                                <FaBox className="icon"/> Company
                            </Link>
                        </li>
                        <li>
                            <Link href="/superadmin/home">
                                <FaInfoCircle className="icon"/> Send Email
                            </Link>
                        </li>
                    </ul>
                    <div className="logout-container">
                        <PrimaryButton onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt className="icon" /> Logout
                        </PrimaryButton>
                        </div>                   
                </div>
            </div>
        </>
    )
};
export default AdminDash;