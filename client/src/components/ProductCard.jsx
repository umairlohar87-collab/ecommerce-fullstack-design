import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded shadow">
      <img
        src={product.image}
        alt=""
        className="w-full h-48 object-cover"
      />

      <h2 className="text-xl font-bold mt-2">{product.name}</h2>

      <p>${product.price}</p>

      <Link to={`/product/${product._id}`}>
        <button className="bg-black text-white px-4 py-2 mt-3">
          View Details
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;