import React from "react";
import ProductForm from "../components/ProductForm";


export default function AddPage({ url }) {
  const handleSubmit = async (e, name, description, price, imgUrl, stock, categoryId) => {
    e.preventDefault();
    const product = { name, description, price, imgUrl, stock, categoryId };
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${url}/products`, product, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      Toastify({
        text: "Product added successfully",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold"
        }
      }).showToast();
      navigate('/');
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold"
        }
      }).showToast();
    }
  };

  return (
    <ProductForm
      url={url}
      handleSubmit={handleSubmit}
      nameProp="Add Product"
    />
  );
}


