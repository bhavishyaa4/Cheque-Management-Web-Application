import React from "react";
import { Head } from "@inertiajs/react";
import { FaChartLine } from "react-icons/fa";

const Tracker = ({ totalCheques, chequeCounts, totalUsers, totalProducts, totalEmployess }) => {
    return (
        <>
        <div className="dashboard-container">
            <div className="tracker-container">
                    <Head title="Employee Tracker" />
                    <h1 className="tracker-title">
                        <FaChartLine className="icon" /> Company Tracker
                    </h1>

                    <div className="tracker-summary">
                        <h2>Overview</h2>
                        <ul>
                            <li>Total Users: <strong>{totalUsers}</strong></li>
                            <li>Total Cheques: <strong>{totalCheques}</strong></li>
                            <li>Total Products: <strong>{totalProducts}</strong></li>
                            <li>Total Employees: <strong>{totalEmployess}</strong></li>
                            <li className="text-yellow-500">Pending: <strong>{chequeCounts.pending}</strong></li>
                            <li className="text-orange-500">Hold: <strong>{chequeCounts.hold}</strong></li>
                            <li className="text-red-500">Cancelled: <strong>{chequeCounts.cancelled}</strong></li>
                            <li className="text-green-500">Completed: <strong>{chequeCounts.completed}</strong></li>
                        </ul>
                    </div>
            </div>  
        </div>     
        </>
    );
};

export default Tracker;
