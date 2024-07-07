import React, { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";

export default function EditPage({ url }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`${url}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProduct(data);
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
    }

    fetchProduct();
  }, [url, id]);

  const handleSubmit = async (e, name, description, price, imgUrl, stock, categoryId) => {
    e.preventDefault();
    const updatedProduct = { name, description, price, imgUrl, stock, categoryId };
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${url}/products/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      Toastify({
        text: "Product updated successfully",
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

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <ProductForm
      url={url}
      handleSubmit={handleSubmit}
      product={product}
      nameProp="Update Product"
    />
  );
}
