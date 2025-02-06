import { Head, Link, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import { FaBox, FaInfoCircle, FaMoneyBillAlt, FaPhoneAlt, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import '../../../css/companyDashboard.css';
import '../../../css/Employee/chequeEdit.css';
import PrimaryButton from "@/Components/PrimaryButton";

const EditProfile = ({user}) => {
    const {data, setData, post, processing, errors} = useForm({
        name:user.name,
    });
    console.log('Data:',data);

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if(isConfirmed){
            post(route('applicant.logout'));
        }
    };

    const nameInputRef = React.useRef(null);
    useEffect(() =>{
        nameInputRef.current.focus();
    },[]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     post(route('applicant.updateprofile'), data, {
    //         onSuccess: () => {
    //             alert('Profile Updated Successfully.');
    //         }
    //     });
    // };

        const handleSubmit = (e) => {
        e.preventDefault();
        post(route('applicant.updateprofile'), {
            onSuccess: () => {
                alert('Profile Updated Successfully.');
            }
        });
    };


    return (
        <>
            <div className="dashboard-container">
                <Head title="Edit Profile" />
                <div className="sidebar">
                <Link href="/applicant/authdash" className="sidebar-header">
                    Dashboard
                </Link>
                <ul className="sidebar-menu">
                    <li>
                        <Link href="/applicant/authdash" className="sidebar-link">
                            <FaBox className="icon" /> Products
                        </Link>
                    </li>
                    <li>
                        <a href="/applicant/about" className="sidebar-link">
                            <FaInfoCircle className="icon" /> About
                        </a>
                    </li>
                    <li>
                        <a href="/applicant/cheques" className="sidebar-link">
                            <FaMoneyBillAlt className="icon" />Cheque
                        </a>
                    </li>
                    <li>
                        <a href="/applicant/contact" className="sidebar-link">
                            <FaPhoneAlt className="icon" /> Contact
                        </a>
                    </li>
                    <li>
                        <a href="/applicant/edit-profile" className="sidebar-link">
                            <FaUserEdit className="icon" /> Edit Profile
                        </a>
                    </li>
                </ul>
                    <div className="logout-container">
                        <button onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
                    <div className="edit-cheque-container mx-auto animate-fadeIn">
                    <form onSubmit={handleSubmit} className='form-container'>
                            <div className="form-content">
                            <h2 className='form-title text-purple-500'>Edit Profile</h2>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        ref={nameInputRef}
                                        type="text"
                                        id="name"
                                        name="name"
                                        className='rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 form-control'
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <PrimaryButton type="submit" className='save-button' disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Profile'}
                                </PrimaryButton>
                            </div>
                    </form>
                </div>                
            </div>
        </>
    );

};
export default EditProfile;