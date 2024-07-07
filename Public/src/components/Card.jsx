import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function Card({ product }) {
  return (
    <>
            <div className="card bg-base-100 w-50 shadow-xl flex-wrap hover:scale-110">
                <div className="mask mask-squircle w-38">
                    <img
                        src={product.imgUrl}
                        alt="product image rounded-xl aspect-w-18 aspect-h-12 object-cover h-30 w-30 " />
                </div>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.Category.name}</p>
                </div>
            </div>
        </>

  );
}
