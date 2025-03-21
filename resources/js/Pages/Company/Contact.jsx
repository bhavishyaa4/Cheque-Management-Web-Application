import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import SideBarAdmin from "@/Components/SideBarAdmin";
import '../../../css/companyDashboard.css'
import '../../../css/Applicant/contact.css'
import InputError from "@/Components/InputError";

const Contact = ({company_id,company_name}) =>{
    
    const {data, errors, setData, post, processing, reset} = useForm({
        name: "",
        email: "",
        messageContent: "",
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
        post(route('company.contact.send'),{
            onError: (errors) => {
                console.log('Errors:',errors);
            },
           onFinish: () => {
                reset('name','email','messageContent');
            },
            onSuccess: () => {
                alert("Message Sent Successfully.")
            },
        });
    };

    return (
        <>
            <Head title="Contact Us" />
            <div className="dashboard-container">
            <SideBarAdmin company_id={company_id} company_name={company_name} />
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
                                <InputError message={errors.name}/>
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
                                <InputError message={errors.email}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <textarea type="text"
                                rows="5"
                                id="messageContent"
                                name="messageContent"
                                className="rounded-md border-yellow-400 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 form-control"
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
    );
};

export default Contact;