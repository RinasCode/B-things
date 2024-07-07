import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import gearLoad from "../components/assets/Gear-0.2s-264px.svg";

export default function HomePage({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${url}/public/products?sort=createdAt&category=3&author=1&search=&page[data]=2&page[number]=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
            fontWeight: "bold",
          },
        }).showToast();
      }
    }

    fetchProducts();
  }, [url]);

  function handleDetails(id) {
    navigate(`/detail/${id}`);
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter(product => product.id !== id)); // Remove product from the state
      Toastify({
        text: "Product deleted successfully",
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
          fontWeight: "bold",
        },
      }).showToast();
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
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  return (
    <div id="PAGE-HOME" className="p-3 bg-blue-100">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(product.price)}
                </td>
                <td>{product.stock}</td>
                <td>
                  <img
                    src={product.imgUrl}
                    alt={product.name}
                    className="h-12 w-12"
                  />
                </td>
                <td>{product.Category.name}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-info btn-xs"
                    onClick={() => handleDetails(product.id)}
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-active btn-xs"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-active btn-xs"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="mt-32 flex justify-center items-center">
          <img src={gearLoad} alt="Loading..." />
        </div>
      )}
    </div>
  );
}



