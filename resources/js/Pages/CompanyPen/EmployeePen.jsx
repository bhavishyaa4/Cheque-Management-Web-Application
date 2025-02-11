import SideBarPen from "@/Components/SideBarPen";
import { Head } from "@inertiajs/react";

const EmployeePen = () => {

    return (
        <>
            <div className="dashboard-container">
                    <Head title="Employee Pending" />
                    <SideBarPen />
                </div>        
        </>
    )
}
export default EmployeePen;