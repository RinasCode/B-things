import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios'
import Toastify from 'toastify-js'

function ProductDetails({ url }) {
    const [product, setProduct] = useState([]);
    const { id } = useParams()

    // console.log(product.Category);
    async function fetchProduct() {
        try {
            const { data } = await axios.get(`${url}/public/products/${id}`)

            setProduct(data.products)
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

    useEffect(() => {
        fetchProduct()
    }, [])

    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(product.price);

    return (
        <>
            <div className="hero bg-base-200 min-h-screen mt-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={product.imgUrl}
                        alt={product.name}
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">{product.name}</h1>
                        <p className="py-6 text-xl">
                            {product.description}
                        </p>
                        <p className="py-6 text-2xl">
                            Now Only: {formattedPrice}
                        </p>
                        <p className="py-6 text-xl">
                            {product.stock} pcs left. Grab It Now!
                        </p>
                        <Link to="/">
                            <button className="btn btn-neutral btn-primary">Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ProductDetails