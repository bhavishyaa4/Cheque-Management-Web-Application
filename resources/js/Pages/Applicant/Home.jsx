import { Head, Link } from '@inertiajs/react';
export default function Home({ companies, message, applicant_name, company_name }) {
    console.log('Companies:', companies);
    return (
        <>
            <Head title="Welcome to the Applicant Dashboard" />

            <div className="container mx-auto animate-fadeIn">
                <h2 className="text-3xl text-blue-600 font-bold mb-6 text-center mt-6">
                    {message}
                </h2>
                {applicant_name && (
                    <p className="text-xl text-gray-700 text-center mb-6">
                        Welcome, {applicant_name} from {company_name}!
                    </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {companies.map((company) => (
                        <div key={company.id} className="border rounded-lg p-4">
                            <h3 className="text-xl font-semibold">{company.name}</h3>
                            <p className="text-sm text-gray-600">{company.description}</p>
                            <div className="mt-4">
                                {company.products.map((product) => (
                                    <div key={product.id} className="border-b py-2">
                                        <h4 className="font-semibold">{product.name}</h4>
                                        <p>{product.description}</p>
                                        <p className="font-bold text-blue-500">Rs.{product.price}</p>
                                        {!applicant_name ? (
                                            <Link
                                                href={`/applicant/register?company_id=${company.id}`}
                                                className="text-blue-500"
                                            >
                                                Register to Buy
                                            </Link>
                                        ) : (
                                            <button type='submit' className="bg-blue-500 text-white p-2 rounded">
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
