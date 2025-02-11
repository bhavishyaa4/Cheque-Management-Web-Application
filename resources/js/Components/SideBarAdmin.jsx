import { Link, useForm } from "@inertiajs/react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import '../../css/companyDashboard.css';
import { FaBox, FaInfoCircle, FaUserTie, FaPhoneAlt, FaSignOutAlt, FaDraftingCompass } from "react-icons/fa";

const SideBarAdmin = ({company_name,company_id}) => {

    const{post} = useForm();
    console.log('Company Id:',company_id);
    console.log('Company Name:',company_name);
    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if(isConfirmed){
            post(route('company.logout'));
        }
    };

    return (
        <>
            <div className="dashboard-container">
                <div className="sidebar">
                        <Link href='/company/home' className='sidebar-header'>
                             Dashboard
                        </Link>
                        <ul className='sidebar-menu'>
                            <li>
                                <Link href="/company/products"className='sidebar-link'>
                                    <FaBox className='icon'/> Products
                                </Link>
                            </li>
                            <li>
                                <Link href={`/company/employees?company_id=${company_id}`} className="sidebar-link">
                                    <FaUserTie className='icon'/> Employee 
                                </Link>
                            </li>
                            <li>
                                <Link href="/company/about" className='sidebar-link'>
                                    <FaInfoCircle className='icon'/> About 
                                </Link>
                            </li>
                            <li>
                                <a href="/company/trackers" className="sidebar-link">
                                    <FaDraftingCompass className="icon" /> Tracker
                                </a>
                            </li>                           
                            <li>
                                <Link href="/company/contactus" className='sidebar-link'>
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
export default SideBarAdmin;