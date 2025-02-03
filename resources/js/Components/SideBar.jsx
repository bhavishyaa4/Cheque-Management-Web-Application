import { Link, useForm } from "@inertiajs/react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import '../../css/companyDashboard.css';
import { FaBox, FaInfoCircle, FaMoneyBillAlt, FaPhoneAlt, FaSignOutAlt } from "react-icons/fa";

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
                                <Link href="/applicant/authdash"className='sidebar-link'>
                                    <FaBox className='icon'/> Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/applicant/about" className='sidebar-link'>
                                    <FaInfoCircle className='icon'/> About 
                                </Link>
                            </li>
                            <li>
                                <Link href="/applicant/cheques" className='sidebar-link'>
                                    <FaMoneyBillAlt className='icon'/> Cheque 
                                </Link>
                            </li>
                            <li>
                                <Link href="/applicant/contact" className='sidebar-link'>
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
    );
};
export default SideBar;