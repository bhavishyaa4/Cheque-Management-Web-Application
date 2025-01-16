import React from "react";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        description: "",
        price: "",
        image: null,
    });

    console.log('Form Data:', data);
    console.log('Errors:', errors);
  
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
        post(route("company.products.store"), {
            onSuccess: () => {
                alert("Product created successfully!");
            },
            onError: () => {
                alert("Failed to create the product.");
            },
        });
    };

    return (
        <div className="create-product-page">
            <Head title="Create New Product" />

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

                <PrimaryButton type="submit" className="submit-button" disabled={processing}>
                    {processing ? "Creating..." : "Create Product"}
                </PrimaryButton>
            </form>
        </div>
    );
}
