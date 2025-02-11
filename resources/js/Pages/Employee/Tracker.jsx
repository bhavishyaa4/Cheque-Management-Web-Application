import React from "react";
import { Head, Link } from "@inertiajs/react";
import { FaBan, FaChartLine, FaCheckCircle, FaDraftingCompass, FaFileInvoice, FaHourglassHalf, FaPause, FaSignOutAlt, FaUserEdit, FaUsers } from "react-icons/fa";
import PrimaryButton from "@/Components/PrimaryButton";
import '../../../css/companyDashboard.css';
import '../../../css/Employee/tracker.css';

const Tracker = ({ totalCheques, chequeCounts, totalUsers, totalProducts, totalEmployess }) => {

    const handleLogout = (e) =>{
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if(isConfirmed){
            post(route('employee.logout'));
        }
    }

    return (
        <>
            <div className="dashboard-container">
                <Head title="Employee Tracker" />
                    <div className="sidebar">
                        <Link href="/employee/firstDash" className="sidebar-header">
                            Employee Dashboard
                        </Link>
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
                            <li>
                                <Link href="/employee/tracker" className='sidebar-link'>
                                    <FaDraftingCompass className='icon'/> Tracker 
                                </Link>
                            </li>
                        </ul>
                            <div className="logout-container">
                                <PrimaryButton onClick={handleLogout} className='logout-button'>
                                    <FaSignOutAlt className='icon'/> Logout
                                </PrimaryButton>
                            </div>
                    </div>
                    <div className="tracker-container">
                        <div className="tracker-header">
                            <h2 className="track-start">
                                <FaChartLine className="icons" /> Overview
                            </h2>
                        </div>
                        <div className="user-header">Total Users</div>
                        <div className="stats-row">
                            <div className="stat-item">
                                <FaUsers className="stat-icon" />
                                <div className="stat-value">{totalUsers}</div>
                            </div>
                        </div>

                        <div className="cheque-header">Total Cheques</div>
                        <div className="stats-row">
                            <div className="stat-item">
                                <FaFileInvoice className="stat-icon" />
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
