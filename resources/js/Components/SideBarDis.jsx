import { FaBox, FaInfoCircle, FaUserTie, FaPhoneAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import React from "react";
import '../../css/companyDashboard.css';
import PrimaryButton from "./PrimaryButton";
const SideBarDis = () => {

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if(isConfirmed){
            post(route(''));
        }
    };

    return (
        <>
                       <div className="dashboard-container">
                <div className="sidebar">
                        <Link href='' className='sidebar-header'>
                             Dashboard
                        </Link>
                        <ul className='sidebar-menu'>
                            <li>
                                <Link href=""className='sidebar-link'>
                                    <FaBox className='icon'/> Products
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="sidebar-link">
                                    <FaUserTie className='icon'/> Employee 
                                </Link>
                            </li>
                            <li>
                                <Link href="" className='sidebar-link'>
                                    <FaInfoCircle className='icon'/> About 
                                </Link>
                            </li>
                            <li>
                                <Link href="" className='sidebar-link'>
                                    <FaPhoneAlt className='icon'/> Contact 
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
    )

};
export default SideBarDis;