import SideBarDis from "@/Components/SideBarDis";
import { Head } from "@inertiajs/react";
import '../../../css/Company/pending.css';

const Disabled = () =>{

    return (
        <>
            <Head title="Disable Company"/>
            <div className="dashboard-container">
                <SideBarDis />
                <div className="pending-container">
                        <h2 className="pending-header">Company is Currently Disabled</h2>
                    <div className="message-box">
                        <p>Your Company is <u>currently disabled</u>. There are multiple complains with the 
                        service and product of your company. Please wait for a few days
                         as we process your information. You will be notified throgh email, once the review 
                         is completed. <br className="break"></br><strong>Thank you for your patience.</strong></p>
                    </div>
                </div>
            </div>
        </>
    )

};
export default Disabled;