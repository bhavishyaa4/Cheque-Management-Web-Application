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
                                <Link href="/employee/edit-profile" className='sidebar-link'>
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
                        <p className='start'>
                            <span className="word">
                                {"Welcome,  ".split("").map((letter, index) => (
                                    <span key={index} className="letter" style={{ animationDelay: `${index * 0.1}s` }}>
                                        {letter}
                                    </span>
                                ))}
                            </span>
                            <span className="word">
                                {employeeName.split("").map((letter, index) => (
                                    <span
                                        key={index}
                                        className="letter"
                                        style={{
                                            animationDelay: `${(index + "Welcome,  ".length) * 0.1}s`,
                                            fontWeight: 'bold',
                                            fontSize: '1.5rem',
                                            fontFamily: 'cursive'
                                        }}
                                    >
                                        {letter}
                                    </span>
                                ))}
                            </span>
                            <span className="word">
                                {" To ".split("").map((letter, index) => (
                                    <span key={index} className="letter" style={{ animationDelay: `${(index + "Welcome,  ".length + employeeName.length) * 0.1}s` }}>
                                        {letter}
                                    </span>
                                ))}
                            </span>
                            <span className="word">
                                {" Employee ".split("").map((letter, index) => (
                                    <span key={index} className="letter" style={{ animationDelay: `${(index + "Welcome,  ".length + employeeName.length + " to ".length) * 0.1}s` }}>
                                        {letter}
                                    </span>
                                ))}
                            </span>
                            <span className="word">
                                {" Dashboard.".split("").map((letter, index) => (
                                    <span key={index} className="letter" style={{ animationDelay: `${(index + "Welcome,  ".length + employeeName.length + " to ".length + " Employee ".length) * 0.1}s` }}>
                                        {letter}
                                    </span>
                                ))}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}