import SideBarPen from "@/Components/SideBarPen";
import { Head } from "@inertiajs/react";

const AboutPen = () => {

    return (
        <>
            <div className="dashboard-container">
                <SideBarPen />
                    <Head title="About Pending" />
                    <h1>About Us</h1>
                </div>        
        </>
    )
}
export default AboutPen;