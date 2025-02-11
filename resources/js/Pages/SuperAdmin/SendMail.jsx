import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm, Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import '../../../css/companyDashboard.css'
import '../../../css/SuperAdmin/mail.css'
import { FaInfoCircle, FaSignOutAlt } from "react-icons/fa";

const SendMail = ({admin_name, admin_id}) => {
    const {data, post, setData, errors, processing, reset} = useForm({
        name:"",
        email:"",
        messageContent:"", 
    });

    console.log('Admin Name:', admin_name);
    console.log('Admin ID:', admin_id);
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const nameInputRef = React.useRef(null);
    useEffect(() =>{
        nameInputRef.current.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('superadmin.send'),{
            onError: (errors) =>{
                console.log('Errors:',errors);
            }, 
            onFinish: () => {
                reset('name','email','messageContent');
            },
            onSuccess:() => {
                alert("Message Sent Successfully.");
            }
        });
    }

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            post(route('superadmin.logout'));
        }
    };

    return (
        <>
            <Head title="Send Mail" />
            <div className="dashboard-container">
                    <div className="sidebar">
                            <Link href="/superadmin/home" className="sidebar-header">Admin Dashboard</Link>
                            <ul className="sidebar-menu">
                                <li>
                                    <Link href="/superadmin/sendmail" className="sidebar-link">
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
            <div className="contact-container mx-auto animate-fadeIn">
                    <form onSubmit={handleSubmit}className="form-container">
                    <h2 className=" form-title text-orange-500">Super Admin Mail</h2>
                        <div className="form-content">
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text"
                                ref={nameInputRef}
                                id="name"
                                name="name"
                                className="rounded-md border-orange-500 shadow-sm focus:border-orange-600 focus:ring-orange-600 form-control"
                                value={data.name}
                                onChange={handleChange}                               
                                />
                                <InputError message={errors.name}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email"
                                id="email"
                                name="email"
                                className="rounded-md border-orange-500 shadow-sm focus:border-orange-600 focus:ring-orange-600 form-control"
                                value={data.email}
                                onChange={handleChange}                               
                                />
                                <InputError message={errors.email}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <textarea type="text"
                                rows="5"
                                id="messageContent"
                                name="messageContent"
                                className="rounded-md border-orange-500 shadow-sm focus:border-orange-600 focus:ring-orange-600 form-control"
                                value={data.messageContent}
                                onChange={handleChange}                               
                                />
                                <InputError message={errors.messageContent}/>
                            </div>
                        </div>
                        <div className="form-actions">
                            <PrimaryButton type='submit' className="save-button" disabled={processing}>
                                {processing ? 'Sending...' : 'Send'}
                            </PrimaryButton>
                        </div>
                    </form>
            </div>
            </div>
        </>
    )
};
export default SendMail;