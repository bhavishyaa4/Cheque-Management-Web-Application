import SideBarDis from "@/Components/SideBarDis";
import { Head, Link } from "@inertiajs/react";
import '../../../css/Company/about.css'
import { FaBoxOpen, FaCreditCard, FaHeadset, FaRecycle, FaTruckMoving } from "react-icons/fa";

const AboutDis = () => {

    return (
        <>
            <div className="dashboard-container">
                <Head title="About Disable" />
                <SideBarDis />
                <div className="main-content">
                        <h1 className="company-name">
                            About Page
                        </h1>
                            <div className="main-section">
                                <div className="body-section">
                                    <h1 className="header-one">Let's surf for your desired products.</h1>
                                    <p className="header-two">Reach out today and start shopping !!!</p>
                                </div>
                                <div className="image-section">
                                    <img src="/company/aboutsus.jpg" alt="Image Here" className="image-container"/>
                                </div>
                            </div>

                            <div className="banner-section">                           
                                <div className="service-section">
                                    <h1 className="service-head">Our Services:</h1>
                                    <ul>
                                        <li>
                                            <Link className="service-link">
                                            <FaTruckMoving className="icons"/> Home Delivery
                                            </Link>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <Link className="service-link">
                                                <FaHeadset className="icons"/> Customer Service 24/7
                                            </Link>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <Link className="service-link">
                                            <FaCreditCard className="icons"/> Secure Online Payment
                                            </Link>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                        <Link className="service-link">
                                            <FaBoxOpen className="icons"/> Post Sales Services
                                            </Link>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                        <Link className="service-link">
                                            <FaRecycle className="icons"/> Subscription
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        <div className="features-section">
                            <div className="feature-card">
                                <h2>Feature One</h2>
                                <p>Boost your productivity with our top-notch tools.</p>
                            </div>
                            <div className="feature-card">
                                <h2>Feature Two</h2>
                                <p>Seamless collaboration for your entire team.</p>
                            </div>
                            <div className="feature-card">
                                <h2>Feature Three</h2>
                                <p>Secure and reliable solutions you can trust.</p>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}
export default AboutDis;