import SideBarDis from "@/Components/SideBarDis";
import { Head } from "@inertiajs/react";
import '../../../css/Company/productpen.css';
import { FaPlus, FaRegEdit, FaSyncAlt, FaTrashAlt } from "react-icons/fa";

const ProductDis = () => {

    return (
        <>
            <div className="dashboard-container">
                <Head title="Product Disable" />
                <SideBarDis />
                <div className="pending-container">
                    <h2 className="pending-header">Product Page</h2>
                    <div className="product-actions">
                        <p className="action-description">In this section, the company can:</p>
                        <div className="action-box">
                            <ul className="action-item">
                                <li className="icon-link"><FaPlus className="icon create" /> Create Product</li>
                            </ul>
                            <ul className="action-item">
                                <li className="icon-link"><FaRegEdit className="icon edit" /> Edit Product</li>
                            </ul>
                            <ul className="action-item">
                                <li className="icon-link"><FaSyncAlt className="icon update" /> Update Product</li>
                            </ul>
                            <ul className="action-item">
                                <li className="icon-link"><FaTrashAlt className="icon delete" /> Delete Product</li>
                            </ul>
                        </div>
                    </div>
                    <h2 className="product-images">Product Images</h2>
                    <div className="image-demo">
                        <img src="/company/demo.jpg" alt="Product 1" className="demo-image" />
                        <img src="/company/demo.jpg" alt="Product 2" className="demo-image" />
                        <img src="/company/demo.jpg" alt="Product 3" className="demo-image" />
                    </div>
                </div>                
            </div>
        </>
    )
}
export default ProductDis;