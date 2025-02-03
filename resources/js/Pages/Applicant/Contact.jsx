import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import SideBar from "@/Components/SideBar";
import '../../../css/companyDashboard.css'
import '../../../css/Applicant/contact.css'

const Contact = () =>{
    
    const {data, errors, setData, post, processing, reset} = useForm({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const nameInputRef = React.useRef(null);
    useEffect(() =>{
        nameInputRef.current.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('applicant.contact'),{
            onError: (errors) => {
                console.log('Errors:',errors);
            },
           onFinish: () => {
                reset('name','email','message');
            },
            onSuccess: () => {
                alert("Message Sent Successfully.")
            },
        });
    };

    return (
        <>
            <div className="dashboard-container">
            <SideBar />
            <div className="contact-container mx-auto animate-fadeIn">
                    <form onSubmit={handleSubmit}className="form-container">
                    <h2 className=" form-title text-yellow-500">Contact Us</h2>
                        <div className="form-content">
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text"
                                ref={nameInputRef}
                                id="name"
                                name="name"
                                className="rounded-md border-yellow-400 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 form-control"
                                value={data.name}
                                onChange={handleChange}                               
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email"
                                id="email"
                                name="email"
                                className="rounded-md border-yellow-400 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 form-control"
                                value={data.email}
                                onChange={handleChange}                               
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <textarea type="text"
                                rows="5"
                                id="message"
                                name="message"
                                className="rounded-md border-yellow-400 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 form-control"
                                value={data.message}
                                onChange={handleChange}                               
                                />
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
            <Head title="Contact Us" />

        </>
    );
};

export default Contact;