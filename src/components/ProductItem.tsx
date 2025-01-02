import { ProductItemProps } from "../types/dataTypes";

const ProductItem: React.FC<ProductItemProps> = ({ product, onClick }) => {
  const fallbackImage = "https://dummyimage.com/150x150/cccccc/000000%26text=No+Image";

  return (
    <li
      className="bg-white border border-gray-200 rounded-md shadow-sm p-4 hover:shadow-md transition duration-150 ease-in-out transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(product)}
    >
      <img
        src={product.image}
        alt={product.name || "Product image"}
        className="w-full h-48 object-cover rounded-md mb-3"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackImage;
        }}
      />
      <h2 className="text-lg font-medium text-gray-800">{product.name}</h2>
      <p className="text-md text-blue-600 font-semibold mb-1">Pris: {product.current_price}</p>
      <p className="text-sm text-gray-500 mb-1">Leverandør: {product.vendor}</p>
      <p className="text-sm text-gray-600">
        Butikk: <span className="font-medium">{product.store.name}</span>
      </p>
    </li>
  );
};

export default ProductItem;
