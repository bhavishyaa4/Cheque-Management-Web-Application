import React from "react";
import { Head, Link } from "@inertiajs/react";
import { FaBan, FaBox, FaChartLine, FaCheckCircle, FaDraftingCompass, FaFileInvoiceDollar, FaHourglassHalf, FaInfoCircle, FaPause, FaPhoneAlt, FaSignOutAlt, FaUsers, FaUserTie } from "react-icons/fa";
import PrimaryButton from "@/Components/PrimaryButton";
import '../../../css/companyDashboard.css'
import '../../../css/Company/tracker.css'

const Tracker = ({ totalCheques, chequeCounts, totalUsers, totalProducts, totalEmployess, company_id }) => {
    const handleLogout = (e) =>{
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if(isConfirmed){
            post(route('company.logout'));
        }
    }
    console.log('Company Id:', company_id);

    return (
        <>
        <div className="dashboard-container">
            <Head title="Company Tracker" />
                <div className="sidebar">
                    <Link href="/company/home" className="sidebar-header">Dashboard</Link>
                    <ul className="sidebar-menu">
                        <li>
                            <Link href="/company/products" className="sidebar-link">
                                <FaBox className="icon" /> Products
                            </Link>
                        </li>
                        <li>
                            <Link href={`/company/employees?company_id=${company_id}`} className="sidebar-link">
                                <FaUserTie className="icon" /> Employee
                            </Link>
                        </li>
                        <li>
                            <a href="/company/about" className="sidebar-link">
                                <FaInfoCircle className="icon" /> About
                            </a>
                        </li>
                        <li>
                            <a href="/company/trackers" className="sidebar-link">
                                <FaDraftingCompass className="icon" /> Tracker
                            </a>
                        </li>
                        <li>
                            <a href="/company/contactus" className="sidebar-link">
                                <FaPhoneAlt className="icon" /> Contact
                            </a>
                        </li>
                    </ul>
                    <div className="logout-container">
                        <PrimaryButton onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt className="icon" /> Logout
                        </PrimaryButton>
                    </div>
                </div>
                <div className="tracker-container">
                        <div className="tracker-header">
                            <h2 className="track-start">
                                <FaChartLine className="icons" />Overview
                            </h2>
                        </div>
                            <div className="product-header">Total Products</div>
                                    <div className="stats-row">
                                        <div className="stat-item">
                                            <FaBox className="stat-icon" />
                                            <div className="stat-value">{totalProducts}</div>
                                        </div>
                                </div>
                                <div className="product-header">Total Users</div>
                                    <div className="stats-row">
                                        <div className="stat-item">
                                            <FaUsers className="stat-icon" />
                                            <div className="stat-value">{totalUsers}</div>
                                        </div>
                                </div>
                                <div className="employee-header">Total Employees</div>
                                    <div className="stats-row">
                                        <div className="stat-item">
                                            <FaUserTie className="stat-icon" />
                                            <div className="stat-value">{totalEmployess}</div>
                                        </div>
                                </div>
                                <div className="product-header">Total Cheques</div>
                                    <div className="stats-row">
                                        <div className="stat-item">
                                            <FaFileInvoiceDollar className="stat-icon" />
                                            <div className="stat-value">{totalCheques}</div>
                                        </div>
                                </div>
                                <div className="status-header">Cheque Status</div>
                                    <div className="status-row">
                                        <div className="status-item-pending">
                                            <h2 className="pending">Pending</h2>
                                            <div className="status-title text-yellow-500">
                                                <FaHourglassHalf className="icons" />
                                            </div>
                                            <div className="status-value text-yellow-500">{chequeCounts.pending}</div>
                                        </div>

                                        <div className="status-item-hold">
                                        <h2 className="hold">Hold</h2>
                                            <div className="status-title text-orange-500">
                                                <FaPause className="icons" /> 
                                            </div>
                                            <div className="status-value text-orange-500">{chequeCounts.hold}</div>
                                        </div>

                                        <div className="status-item-cancelled">
                                        <h2 className="cancelled">Cancelled</h2>
                                            <div className="status-title text-red-500">
                                                <FaBan className="icons" /> 
                                            </div>
                                            <div className="status-value text-red-500">{chequeCounts.cancelled}</div>
                                    </div>

                                <div className="status-item-completed">
                                    <h2 className="completed">Completed</h2>
                                        <div className="status-title text-green-500">
                                    <FaCheckCircle className="icons" /> 
                                </div>
                            <div className="status-value text-green-500">{chequeCounts.completed}</div>
                        </div>
                    </div>                            
             </div>  
        </div>     
        </>
    );
};

export default Tracker;
