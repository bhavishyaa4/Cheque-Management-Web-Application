import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import { FaSave, FaArrowLeft } from "react-icons/fa";

export default function Edit({ product }) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleImageChange = (e) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!allowedTypes.includes(file.type)) {
                alert("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
                return;
            }
            setData("image", file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("company.products.update", product.id), {
            onSuccess: () => {
                alert("Product updated successfully!");
            },
            onError: () => {
                alert("Failed to update the product.");
            },
        });
    };

    return (
        <div className="edit-container">
            <Head title="Edit Product" />
            <h1>Edit Product</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text" 
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    {errors.description && (
                        <span className="error">{errors.description}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={data.price}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    {errors.price && <span className="error">{errors.price}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="image">Product Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        className="form-control"
                        accept="image/*"
                    />
                    {data.image && (
                        <div className="image-preview">
                            <img
                                src={URL.createObjectURL(data.image)}
                                alt="Product Image Preview"
                                className="preview-image"
                            />
                        </div>
                    )}
                    {product.image && !data.image && (
                        <div className="image-preview">
                            <img
                                src={`/products/${product.image}`} 
                                alt="Product Image"
                                className="preview-image"
                            />
                        </div>
                    )}
                    {errors.image && <span className="error">{errors.image}</span>}
                </div>

                <div className="form-actions">
                    <PrimaryButton type="submit" className="save-button" disabled={processing}>
                        <FaSave /> Save Changes
                    </PrimaryButton>
                    <a href={route("company.products.home")} className="back-button">
                        <FaArrowLeft /> Back to Dashboard
                    </a>
                </div>
            </form>
        </div>
    );
}
