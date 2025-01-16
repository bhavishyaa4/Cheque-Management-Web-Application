import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import '../../../css/productSideBar.css';
import { FaBox, FaUserTie, FaInfoCircle, FaPhoneAlt, FaSignOutAlt } from "react-icons/fa";

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        description: "",
        price: "",
        image: null,
    });

    const [errorMessage, setErrorMessage] = useState(''); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setData("image", files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); 

        post(route("company.products.store"), {
            onError: (err) => {
                if (err.message) {
                    setErrorMessage(err.message); 
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again."); 
                }
            },
            onFinish: () => {
                setErrorMessage('');
            },
            onSuccess: () => {
                alert("Product Created successfully!");
            }
        });
    };

    const handleLogout = (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Are you sure you want to log out?");

        if (isConfirmed) {
            post(route('logout'), {
                onSuccess: (response) => {
                    console.log('Logout Response:', response);
                    setLogoutMessage(response.message || "You have logged out successfully!");
                },
                onError: (error) => {
                    console.error('Logout Failed:', error);
                    setLogoutMessage("Logout failed. Please try again.");
                }
            });
        }
    };

    return (
        <>
            <Head title="Create New Product" />
            <div className="dashboard-container">
                         <div className="sidebar">
                              <div className="sidebar-header">Dashboard</div>
                              <ul className="sidebar-menu">
                                  <li>
                                      <Link href="/company/products" className="sidebar-link">
                                          <FaBox className="icon" /> Products
                                      </Link>
                                  </li>
                                  <li>
                                      <a href="#" className="sidebar-link">
                                          <FaUserTie className="icon" /> Employee
                                      </a>
                                  </li>
                                  <li>
                                      <a href="#" className="sidebar-link">
                                          <FaInfoCircle className="icon" /> About
                                      </a>
                                  </li>
                                  <li>
                                      <a href="#" className="sidebar-link">
                                          <FaPhoneAlt className="icon" /> Contact
                                      </a>
                                  </li>
                              </ul>
                              <div className="logout-container">
                                  <PrimaryButton onClick={handleLogout} className="logout-button">
                                      <FaSignOutAlt className="icon" /> Logout
                                  </PrimaryButton>
                              </div>
                          </div>  
            <div className="create-product-page">
                <h1>Create New Product</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="create-product-form">
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleInputChange}
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            placeholder="Enter product name"
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Product Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleInputChange}
                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                            placeholder="Enter product description"
                        />
                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Product Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={handleInputChange}
                            className={`form-control ${errors.price ? "is-invalid" : ""}`}
                            placeholder="Enter product price"
                        />
                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Product Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            className={`form-control ${errors.image ? "is-invalid" : ""}`}
                            accept="image/*"
                        />
                        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                    </div>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    <PrimaryButton type="submit" className="submit-button" disabled={processing}>
                        {processing ? "Creating..." : "Create Product"}
                    </PrimaryButton>
                </form>
            </div>
        </div>
    </>
    );
}
