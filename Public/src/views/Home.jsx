import axios from 'axios';
import { useState, useEffect } from "react"
import Card from "../components/Card"
import gearLoad from "../components/assets/Gear-0.2s-264px.svg"
import { Link } from "react-router-dom"
import Toastify from 'toastify-js'

function Home({ url }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('ShowAll'); // initialize category state with 'ShowAll'
    const [allProducts, setAllProducts] = useState([]); // store all products for filtering
    const [sort, setSort] = useState('nameASC'); // initialize sort state with 'nameASC'
    const [currentPage, setCurrentPage] = useState(1); // initialize current page state
    const [productsPerPage, setProductsPerPage] = useState(9); // initialize products per page state
    const categories = [
        { key: 1, value: 'Ladies' },
        { key: 2, value: 'Men' },
        { key: 3, value: 'Kids' },
    ];

    async function fetchProducts() {
        try {
            setLoading(true);
            const { data } = await axios.get(`${url}/public/products`);

            console.log(data, `data di home`);
            setProducts(data.data);
            setAllProducts(data.data); // store all products for filtering

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
                    fontWeight: "bold",
                },
            }).showToast();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    // search
    function searchOnChange(event) {
        let newSearch = event.target.value;
        setSearch(newSearch);
        filterProducts(newSearch, category);
    }

    function handleCategoryChange(event) {
        let newCategory = event.target.value;
        setCategory(newCategory);
        filterProducts(search, newCategory);
    }

    function handleSortChange(event) {
        let newSort = event.target.value;
        setSort(newSort);
        sortProducts(newSort, products);
    }

    // filter products based on search and category
    function filterProducts(searchQuery, category) {
        let filteredProducts = allProducts;

        if (searchQuery!== '') {
            filteredProducts = filteredProducts.filter((product) => {
                const productName = product.name.toLowerCase();
                return productName.includes(searchQuery.toLowerCase());
            });
        }

        if (category!== 'ShowAll') {
            filteredProducts = filteredProducts.filter((product) => {
                return product.categoryId === parseInt(category);
            });
        }

        setProducts(filteredProducts);
    }

    // sort products based on sort option
    function sortProducts(sortOption, products) {
        let sortedProducts = products;

        if (sortOption === 'nameASC') {
            sortedProducts = products.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        } else if (sortOption === 'priceDESC') {
            sortedProducts = products.sort((a, b) => b.price - a.price);
        }

        setProducts(sortedProducts);
    }

    // pagination
    function paginate(products) {
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

        return currentProducts;
    }

    return (
        <>
            <div className="flex justify-between mb-4 mt-10">
                <div className="flex items-center gap-2">
                    <form action="" method="get" className="flex justify-center items-center">
                        <input
                            type="search"
                            name="search"
                            placeholder="Search"
                            className="input input-bordered"
                            onChange={searchOnChange}
                        />
                    </form>
                    <select className="select select-bordered" onChange={handleCategoryChange} value={category}>
                        <option value="ShowAll">Show All</option>
                        {categories.map((category) => (
                            <option key={category.key} value={category.key}>
                                {category.value}
                            </option>
                        ))}
                    </select>
                    <select className="select select-bordered" onChange={handleSortChange} value={sort}>
                        <option value="nameASC">Name (A-Z)</option>
<option value="priceDESC">Price (High-Low)</option>
                        {/* add more sort options here */}
                    </select>
                </div>
            </div>

            {loading? (
                <div className="mt-32 flex justify-center items-center">
                    <img src={gearLoad} />
                </div>
            ) : (
                <div id="PAGE-HOME" className="p-3">
                    <div className="grid grid-cols-3 gap-10 px-5 my-8 bg-white flex-wrap">
                        {paginate(products).map((product) => {
                            return (
                                <Link key={product.id} to={`/public/products/${product.id}`}>
                                    <Card product={product} />
                                </Link>
                            );
                        })}
                    </div>
                    <div className="flex justify-center mt-5">
                        <button className="btn btn-neutral" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <button className="btn btn-grey" onClick={() => setCurrentPage(currentPage + 1)} disabled={paginate(products).length < productsPerPage}>Next</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;