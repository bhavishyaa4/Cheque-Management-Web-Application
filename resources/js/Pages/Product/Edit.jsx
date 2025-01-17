import React  from "react";
import '../../../css/productSideBar.css';
import '../../../css/Product/productEdit.css';
import { Head, useForm, Link } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import { FaUserTie, FaBox, FaPhoneAlt, FaSignOutAlt, FaInfoCircle, FaSave, FaArrowLeft } from "react-icons/fa";

export default function Edit({ product }) {
  const { data, setData, put, processing, errors } = useForm({
    name: product.name,
    description: product.description,
    price: product.price,
    image: null,
  });

  console.log('Form Data:', data);
  console.log('Errors:', errors);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setData("image", files[0]);
    } else {
      console.log("No file selected.");
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
          <div className="container mx-auto">
          <Head title="Edit Product" />

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-container">
              <h2 className="form-title">Edit Product</h2>
              <div className="form-content">
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
                  {errors.description && <span className="error">{errors.description}</span>}
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
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                    className="form-control"
                  />
                  <div className="image-preview-container">
                    {data.image && (
                      <img
                        src={URL.createObjectURL(data.image)}
                        alt="Product Image Preview"
                        className="preview-image"
                      />
                    )}
                    {product.image && !data.image && (
                      <img
                        src={`/uploads/products/${product.image}`}
                        alt="Product Image"
                        className="preview-image"
                      />
                    )}
                  </div>
                  {errors.image && <span className="error">{errors.image}</span>}
                </div>
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
        </div>
    </>
  );
}
