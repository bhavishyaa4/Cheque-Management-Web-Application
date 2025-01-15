import React from 'react';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaBox, FaCog } from 'react-icons/fa';

export default function ProductsPage() {
    return (
        <div className="products-page">
            <h1>Products Page</h1>
            <div className="product-options">
                <Link href="/company/products/home" className="option-button">
                    <PrimaryButton>
                        <FaBox className="icon" /> Product Dashboard
                    </PrimaryButton>
                </Link>
                <Link href="/company/products/control" className="option-button">
                    <PrimaryButton>
                        <FaCog className="icon" /> Product Control
                    </PrimaryButton>
                </Link>
            </div>
        </div>
    );
}
