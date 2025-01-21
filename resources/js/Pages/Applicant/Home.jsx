import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import '../../../css/Applicant/publicdash.css';

export default function Home({ companies, message, applicant_name, company_name }) {
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleCompanyClick = (companyId) => {
        const company = companies.find((company) => company.id === companyId);
        setSelectedCompany(company);
    };

    return (
        <>
            <Head title="Welcome to the Applicant Dashboard" />

            <div className="container mx-auto animate-fadeIn">
                <h2 className="dashboard-title">{message}</h2>
                {applicant_name && (
                    <p className="welcome-text">
                        Welcome, {applicant_name} from {company_name}!
                    </p>
                )}
                
                <div className="companies-container">
                    {companies.map((company) => (
                        <PrimaryButton
                            className="company-button"
                            key={company.id}
                            onClick={() => handleCompanyClick(company.id)}
                        >
                            {company.name}
                        </PrimaryButton>
                    ))}
                </div>

                {selectedCompany && (
                    <div>
                        <h3 className="product-header">
                            Products from {selectedCompany.name}
                        </h3>
                        <div className="products-container">
                            {selectedCompany.products.map((product) => (
                                <div key={product.id} className="product-item">
                                    <h4 className="product-name">{product.name}</h4>
                                    <p>{product.description}</p>
                                    <p className="product-stock">Available Stock: {product.stock}</p>
                                    <p className="product-price">Price: Rs.{product.price}</p>
                                    {product.image && (
                                            <img
                                                src={`/uploads/products/${product.image}`} 
                                                alt={product.name}
                                                className="product-image"
                                            />
                                        )}
                                    <Link
                                        href={`/applicant/register?company_id=${selectedCompany.id}`}
                                        className="register-button"
                                    >
                                        Register to Buy
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
