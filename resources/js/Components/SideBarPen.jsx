import React from "react";  
import { Link } from "@inertiajs/react";
import { FaBox, FaInfoCircle, FaPhoneAlt, FaSignOutAlt, FaUserTie } from "react-icons/fa";
import PrimaryButton from "./PrimaryButton";
import '../../css/companyDashboard.css';

const SideBarPen = () => {

    const handleLoginRedirect = (companyId, companyEmail) => {
        const pendingCompanies = JSON.parse(localStorage.getItem('pendingCompanies')) || [];
        
        if (!pendingCompanies.some(company => company.id === companyId)) {
            pendingCompanies.push({ id: companyId, email: companyEmail });
            localStorage.setItem('pendingCompanies', JSON.stringify(pendingCompanies));
        }

        window.location.href = `/company/pending?company_id=${companyId}&email=${companyEmail}`;
    }
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
                        <Link href='/company/pending' className='sidebar-header'>
                             Dashboard
                        </Link>
                        <ul className='sidebar-menu'>
                            <li>
                                <Link href="/company/productpen"className='sidebar-link'>
                                    <FaBox className='icon'/> Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/company/employeepen" className="sidebar-link">
                                    <FaUserTie className='icon'/> Employee 
                                </Link>
                            </li>
                            <li>
                                <Link href="/company/aboutpen" className='sidebar-link'>
                                    <FaInfoCircle className='icon'/> About 
                                </Link>
                            </li>
                            <li>
                                <Link href="/company/contactpen" className='sidebar-link'>
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
    }   
export default SideBarPen;