import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate, Link } from "react-router-dom";
import gearLoad from "../components/assets/Gear-0.2s-264px.svg";

function HomePage({ url }) {
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    async function handleDelete(id) {
        try {
            await axios.delete(`${url}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            Toastify({
                text: "Success delete",
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

            fetchProducts()
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

    async function fetchProducts() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${url}/products`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            
            setProducts(data.products);
        } catch (error) {
            Toastify({
                text: error.response.data.error,
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#EF4C54",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            }).showToast();
        } finally {
            setLoading(false)
        }
    }

    
    useEffect(() => {
        
    }, []) 

    useEffect(() => {
      
        fetchProducts();
    }, [search])

  return (
    <>
      <Link to="/add" className="flex justify-between mb-4 mt-10">
        <button className="btn">Add Products</button>
      </Link>

      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={gearLoad} alt="Loading..." />
        </div>
      ) : (
        <div className="overflow-x-auto mt-10">
          <table className="table">
           
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={product.imgUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product.name}</div>
                        <div className="text-sm opacity-50">{product.Category.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {product.description}
                    <br />
                  </td>
                  <td>{product.stock}</td>
                  <th>
                    <div className="flex gap-2">
                      <Link to={`/products/${product.id}`} className="btn btn-ghost btn-xs text-green-500">
                        Details
                      </Link>
                      <Link to={`/edit/${product.id}`} className="btn btn-ghost btn-xs text-yellow-500">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(product.id)} className="btn btn-ghost btn-xs text-red-500">
                        Delete
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default HomePage;




