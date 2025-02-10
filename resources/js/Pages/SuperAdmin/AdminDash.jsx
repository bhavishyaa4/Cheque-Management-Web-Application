// import PrimaryButton from "@/Components/PrimaryButton";
// import { Head, Link, useForm } from "@inertiajs/react";
// import React, { useState } from "react";
// import { FaBox, FaInfoCircle, FaPen, FaSignOutAlt, FaTrash } from "react-icons/fa";

// const AdminDash = ({company = [], admin_name, admin_id }) => {
//     const {post, processing} = useForm();
//     console.log('Companies:',company)
//     console.log('Admin Name:', admin_name);
//     console.log('Admin ID:', admin_id);
//     const [companyList, setCompanyList] = useState(company);

//     const handleLogout = (e) => {
//         e.preventDefault();
//         const isConfirmed = window.confirm("Are you sure you want to log out?");
//         if(isConfirmed){
//             post(route('superadmin.logout'));
//         };
//     };

//     return (
//         <>
//             <Head title="Admin Dashboard"/>
//             <div className="dashboard-container">
//                 <div className="sidebar">
//                     <Link href="/superadmin/home" className="sidebar-header">Admin Dashboard</Link>
//                     <ul className="sidebar-menu">
//                         <li>
//                             <Link href="/superadmin/home">
//                                 <FaBox className="icon"/> Company
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/superadmin/home">
//                                 <FaInfoCircle className="icon"/> Send Email
//                             </Link>
//                         </li>
//                     </ul>
//                     <div className="logout-container">
//                         <PrimaryButton onClick={handleLogout} className="logout-button">
//                             <FaSignOutAlt className="icon" /> Logout
//                         </PrimaryButton>
//                         </div>                   
//                 </div>
//                 <div className="company-container">
//                     <h1>Company List</h1>
//                         <div className="company-list">
//                             {companyList.length > 0 ? (
//                                 companyList.map((company) => (
//                                    <div key={company.id} className="company-card">
//                                          <h2><b>Name:</b>{company.name}</h2>
//                                          <p className="email"><b>Email:</b> {company.email} </p>
//                                          <p className="address"><b>Address:</b> {company.address} </p>
//                                          <p className="phone"><b>phone:</b> {company.phone} </p>
//                                          <p className="status"><b>Status:</b> {company.status} </p>

//                                          <div className="actions">
//                                             <div className="action-buttons">
//                                                 <PrimaryButton>
//                                                     <Link href="#"className="edit-button" >
//                                                     <FaPen /> {processing ? 'Updating...' : 'Update'}
//                                                     </Link>
//                                                 </PrimaryButton>
//                                                 <PrimaryButton>
//                                                     <Link>
//                                                         <FaTrash /> {processing ? 'Deleting...' : 'Delete'}
//                                                     </Link>
//                                                 </PrimaryButton>
//                                             </div>
//                                          </div>
//                                    </div>
//                                 ))
//                             ) : (
//                                 <p>No companies available.</p>
//                             )}
//                         </div>
//                 </div>
//             </div>
//         </>
//     )
// };
// export default AdminDash;
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { FaBox, FaInfoCircle, FaPen, FaSignOutAlt, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const AdminDash = ({ company = [], admin_name, admin_id }) => {
    const { post, processing } = useForm();
    const [companyList, setCompanyList] = useState(company);

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            post(route('superadmin.logout'));
        }
    };

    const handleApprove = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to approve this company?");
        if (isConfirmed) {
            post(route('superadmin.approveCompany', { id }), {
                onSuccess: () => {
                    window.location.href = '/superadmin/home';
                },
            });
        }
    };

    const handleDisable = (id) => {
       const isConfirmed = window.confirm("Are you sure you want to disable this company?");
       if(isConfirmed){
        post(route('superadmin.disableCompany', {id}),{
             onSuccess: () => {
                window.location.href = '/superadmin/home';
             }
            });
       };
    };

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="dashboard-container">
                <div className="sidebar">
                    <Link href="/superadmin/home" className="sidebar-header">Admin Dashboard</Link>
                    <ul className="sidebar-menu">
                        <li>
                            <Link href="/superadmin/home">
                                <FaBox className="icon" /> Company
                            </Link>
                        </li>
                        <li>
                            <Link href="/superadmin/home">
                                <FaInfoCircle className="icon" /> Send Email
                            </Link>
                        </li>
                    </ul>
                    <div className="logout-container">
                        <PrimaryButton onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt className="icon" /> Logout
                        </PrimaryButton>
                    </div>
                </div>
                <div className="company-container">
                    <h1>Company List</h1>
                    <div className="company-list">
                        {companyList.length > 0 ? (
                            companyList.map((company) => (
                                <div key={company.id} className="company-card">
                                    <h2><b>Name:</b> {company.name}</h2>
                                    <p className="email"><b>Email:</b> {company.email} </p>
                                    <p className="address"><b>Address:</b> {company.address} </p>
                                    <p className="phone"><b>Phone:</b> {company.phone} </p>
                                    <p className="status"><b>Status:</b> {company.status} </p>

                                    <div className="actions">
                                        <div className="action-buttons">
                                            <PrimaryButton onClick={() => handleApprove(company.id)}>
                                                <FaCheck /> {processing ? 'Approving...' : 'Approve'}
                                            </PrimaryButton>
                                            <PrimaryButton onClick={() => handleDisable(company.id)}>
                                                <FaTimes /> {processing ? 'Disabling...' : 'Disable'}
                                            </PrimaryButton>
                                            <PrimaryButton>
                                                <Link>
                                                    <FaTrash /> {processing ? 'Deleting...' : 'Delete'}
                                                </Link>
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No companies available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDash;
