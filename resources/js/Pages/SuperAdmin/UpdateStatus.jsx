import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect } from "react";

const UpdateStatus = ({company}) => {
    const {data, setData, post, processing, errors} = useForm ({
        status: company.status,
    });
    console.log("Data:", data);
    console.log('Company:', company);

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if(isConfirmed){
            post(route('superadmin.logout'));
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('#'),{
            onSuccess: () => {
                window.confirm('Company Status Updated Successfully.');
            }
        });
    };

    const statusInputRef = React.useRef(null);
    useEffect(() =>{
        statusInputRef.current.focus();
    }, []);

    return (
        <>
            <div className="dashboard-container">
                <Head title="Updated Status" /> 
                <div className="sidebar">
                    <Link href="/superadmin/home" className="sidebar-header">Admin Dashboard</Link>
                    <ul className="sidebar-menu">
                        <li>
                            <Link href="/superadmin/home">
                                <FaBox className="icon"/> Company
                            </Link>
                        </li>
                        <li>
                            <Link href="/superadmin/home">
                                <FaInfoCircle className="icon"/> Send Email
                            </Link>
                        </li>
                    </ul>
                        <div className="logout-container">
                            <PrimaryButton onClick={handleLogout} className="logout-button">
                                <FaSignOutAlt className="icon" /> Logout
                            </PrimaryButton>
                        </div> 
                </div>
                <div className="edit-cheque-container mx-auto animate-fadeIn">
                    <form action="" onSubmit={handleSubmit} className="form-container">
                        <div className="form-content">
                            <h2 className='form-title text-purple-500'>Update Status</h2>
                                <div className="form-group">
                                    <label htmlFor="status"></label>
                                    <select
                                        ref={statusInputRef}
                                        name="status"
                                        value="data.status"
                                        onChange={(e) => setData("status", e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Disabled">Disabled</option>
                                    </select>
                                    <InputError message={errors.status} />
                                </div>
                        </div>
                        <div className="form-actions">
                            <PrimaryButton type="submit" className="save-button" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Status'};
                            </PrimaryButton>
                            </div>        
                    </form>
                </div>
            </div>
        </>
    )
};
export default UpdateStatus;