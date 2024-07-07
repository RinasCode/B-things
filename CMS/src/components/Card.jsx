import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Toastify from 'toastify-js'

export default function Card({ product, url, fetchProducts }) {
    const navigate = useNavigate()

    async function handleDelete(id) {
        try {
            await axios.delete(`${url}/apis/branded-things/products/${id}`, {
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


    function handleDetail(id) {
        navigate(`/detail/${id}`)
    }

    function handleEdit(id) {
        navigate(`/edit/${id}`)
    }

    return (<>
        <div className="card bg-gray-100 shadow flex flex-row">
            <figure className="flex flex-col">
                <img
                    src={product.imgUrl}
                    alt="product image"
                    className="max-w-sm rounded-lg shadow mb-2"
                />
                <button onClick={() => handleDetail(product.id)} className="btn btn-accent btn-sm m-1 w-full">Detail</button>
                <button onClick={() => handleDelete(product.id)} className="btn btn-error btn-sm m-1 w-full">Delete</button>
                <button onClick={() => handleEdit(product.id)} className="btn btn-warning btn-sm m-1 w-full">Edit</button>
            </figure>
            <div className="card-body flex-1">
                <b>{product.name}</b>
                {product.description}
            </div>
        </div >
    </>)
}