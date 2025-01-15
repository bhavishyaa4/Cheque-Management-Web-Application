import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create() {
    // Initialize Inertia form
    const { data, setData, post, errors } = useForm({
        name: "",
        description: "",
        price: "",
        image: null,
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("company.products.store"));
    };

    return (
        <div className="create-product-page">
            <Head title="Create New Product" />

            <h1>Create New Product</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="create-product-form">
                {/* Product Name */}
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        placeholder="Enter product name"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                {/* Product Description */}
                <div className="form-group">
                    <label htmlFor="description">Product Description</label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        placeholder="Enter product description"
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                {/* Product Price */}
                <div className="form-group">
                    <label htmlFor="price">Product Price</label>
                    <input
                        type="number"
                        id="price"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        className={`form-control ${errors.price ? "is-invalid" : ""}`}
                        placeholder="Enter product price"
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>

                {/* Product Image */}
                <div className="form-group">
                    <label htmlFor="image">Product Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setData("image", e.target.files[0])}
                        className={`form-control ${errors.image ? "is-invalid" : ""}`}
                    />
                    {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                </div>

                {/* Submit Button */}
                <PrimaryButton type="submit" className="submit-button">
                    Create Product
                </PrimaryButton>
            </form>
        </div>
    );
}
