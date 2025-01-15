import React from "react";
import { Head } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import { FaPlus, FaBox } from "react-icons/fa";

export default function Control() {
    return (
        <div className="control-container">
            <Head title="Product Control" />
            <h1>Product Control</h1>

            <div className="control-actions">
                <a href={route('company.products.create')} className="create-product-button">
                    <PrimaryButton>
                        <FaPlus /> Create New Product
                    </PrimaryButton>
                </a>

                <a href={route('company.products')} className="view-products-button">
                    <PrimaryButton>
                        <FaBox /> View All Products
                    </PrimaryButton>
                </a>
            </div>
        </div>
    );
}
