import Card from "../components/Card";
import { useEffect, useState } from "react";
import gearLoad from "../components/assets/Gear-0.2s-264px.svg"
import axios from 'axios'
import Toastify from 'toastify-js'

export default function HomePage({ url }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    async function fetchProducts() {
        try {
            const { data } = await axios(`${url}/apis/pub/branded-things/products?q=${search}&limit=8&page=1&sort=ASC`)

            setProducts(data.data.query)
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
        fetchProducts()
    }, [search])

    // search
    function searchOnChange(event) {
        let newSearch = event.target.value;
        setSearch(newSearch);
    }

    return (
        <>
            <div id="PAGE-HOME" className="p-3">
                {/* search */}
                <form action="" method="get" className="flex justify-center items-center">
                    <input
                        type="search"
                        name="search"
                        placeholder="Search"
                        className="input input-bordered input-accent md:w-auto mx-1 mt-5 input-sm"
                        onChange={searchOnChange}
                    />
                </form>


                {loading ? (
                    <div className="mt-32 flex justify-center items-center">
                        <img src={gearLoad} />
                    </div>
                ) : (
                    <main className="grid grid-cols-2 gap-5 px-10 my-8 bg-white">
                        {products.map(product => {
                            return <Card key={product.id} product={product} url={url} fetchProducts={fetchProducts} />
                        })}
                    </main>
                )}
            </div >
        </>
    )
}