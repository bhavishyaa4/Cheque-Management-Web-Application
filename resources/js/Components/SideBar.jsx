import { Link, useForm } from "@inertiajs/react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import '../../css/companyDashboard.css';
import { FaSignOutAlt, FaUserEdit, FaUsers } from "react-icons/fa";

const SideBar = () => {

    const{post} = useForm();
    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if(isConfirmed){
            post(route('logout'));
        }
    };

    return (
        <>
            <div className="dashboard-container">
                <div className="sidebar">
                        <Link href='/applicant/authdash' className='sidebar-header'>
                             Dashboard
                        </Link>
                        <ul className='sidebar-menu'>
                            <li>
                                <Link href="/employee/dashboard"className='sidebar-link'>
                                    <FaUsers className='icon'/> Products
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
            </div>
        </>
    );
};
export default SideBar;