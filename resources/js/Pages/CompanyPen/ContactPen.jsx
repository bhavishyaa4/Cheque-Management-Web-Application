import SideBarPen from "@/Components/SideBarPen";
import { Head } from "@inertiajs/react";
import '../../../css/Company/pending.css';

const ContactPen = () => {

    return (
        <>
            <div className="dashboard-container">
                    <Head title="Contact Pending" />
                    <SideBarPen />
                    <div className="pending-container">
                        <h2 className="pending-header">Contact Page</h2>
                        <div className="message-box">
                            <p>This is the Contact Page once you are an approved company you will get a <strong>Contact Form</strong>
                                , form where you can contact with the onwer of the system application <strong>Bhavishya Sunuwar Rai</strong></p>
                        </div>
                    </div>
                </div>        
            </>
        )
    }
export default ContactPen;