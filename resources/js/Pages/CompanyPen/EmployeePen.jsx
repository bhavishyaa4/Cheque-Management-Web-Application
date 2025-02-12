import SideBarPen from "@/Components/SideBarPen";
import { Head } from "@inertiajs/react";
import '../../../css/Company/employeepen.css';
import { FaDollarSign, FaPlus, FaRegEdit, FaSyncAlt, FaTrashAlt } from "react-icons/fa";

const EmployeePen = () => {

    return (
        <>
            <div className="dashboard-container">
                    <Head title="Employee Pending" />
                    <SideBarPen />
                <div className="pending-container">
                    <h2 className="pending-header">Employee Page</h2>
                    <div className="product-actions">
                        <p className="action-description">In this Section, the Company can:</p>
                        <div className="action-box">
                            <ul className="action-item">
                                <li className="icon-link"><FaPlus className="icon create" /> Create Employee</li>
                            </ul>
                            <ul className="action-item">
                                <li className="icon-link"><FaRegEdit className="icon edit" /> Edit Employee</li>
                            </ul>
                            <ul className="action-item">
                                <li className="icon-link"><FaSyncAlt className="icon update" /> Update Employee</li>
                            </ul>
                            <ul className="action-item">
                                <li className="icon-link"><FaTrashAlt className="icon delete" /> Delete Employee</li>
                            </ul>
                        </div>
                    </div>
                    <div className="employee-detail">
                        <h2 className="employee-header">Employee Panel</h2>
                        <div className="employee-actions">
                        <p className="action-description">In the Employee Panel Section, the Employee can:</p>
                        <div className="action-box">
                            <ul className="action-item">
                                <li className="icon-link"><FaDollarSign className="icon create" /> View Cheque</li>
                            </ul>
                            <ul className="action-item">
                                <li className="icon-link"><FaSyncAlt className="icon update" /> Update Cheque</li>
                            </ul>
                            <ul className="action-item">
                                <li className="icon-link"><FaTrashAlt className="icon delete" /> Delete Cheque</li>
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>                    
            </div>        
        </>
    )
}
export default EmployeePen;