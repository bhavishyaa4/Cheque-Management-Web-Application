import SideBarPen from "@/Components/SideBarPen";
import { Head } from "@inertiajs/react";
import '../../../css/Company/pending.css';

const Pending = ({}) => {


    return (
        <>
            <Head title="Pending Company"/>
            <div className="dashboard-container">
                <SideBarPen />
                <div className="pending-container">
                        <h2 className="pending-header">Company is Under Review</h2>
                    <div className="message-box">
                        <p>Your Company is <u>currently under review</u>. Please wait for a few days
                         as we process your information. You will be notified throgh email, once the review 
                         is completed. <br className="break"></br><strong>Thank you for your patience.</strong></p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Pending;
