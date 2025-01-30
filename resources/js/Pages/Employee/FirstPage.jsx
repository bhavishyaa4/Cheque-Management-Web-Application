import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaSignOutAlt, FaUserEdit, FaUsers } from 'react-icons/fa';
import '../../../css/companyDashboard.css';
import '../../../css/Employee/employeeFirstPage.css';

export default function FirstPage({employeeName}){

    const {post} = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if(isConfirmed){
            post(route('logout'));
        }
    };

    return(
        <>
            <div className="home-container">
                <Head title='Employee First Dashboard' />
                <div className="dashboard-container">
                    <div className="sidebar">
                        <div className="sidebar-header">Employee Dashboard</div>
                        <ul className='sidebar-menu'>
                            <li>
                                <Link href="/employee/dashboard"className='sidebar-link'>
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
                                <PrimaryButton onClick={handleLogout} className='logout-button'>
                                    <FaSignOutAlt className='icon'/> Logout
                                </PrimaryButton>
                            </div>
                    </div>
                    <div className="employee-dash">
                    <h1>Employee Dashboard</h1>
                    <p className='start'>Welcome {employeeName} to employee dashboard</p>                       
                    </div>
                </div>
            </div>
        </>
    )
}