import { ProductItemProps, Category } from "../types/dataTypes";

const fImage = "https://cdn-icons-png.flaticon.com/512/2748/2748558.png";

const getImageSrc = (image: string | undefined, categories: Category[]): string => {
  if (image) return image; 
  if (categories.length > 0) {
    const categoryName = categories[0].name.toLowerCase(); 
    if (categoryName.includes("electronics")) return "https://via.placeholder.com/150?text=Electronics";
    if (categoryName.includes("fashion")) return "https://via.placeholder.com/150?text=Fashion";
  }
  return fImage; 
};

const ProductItem: React.FC<ProductItemProps> = ({ product, onClick }) => {

  const imageSrc = getImageSrc(product.image, product.category);

  return (
    <li
      className="bg-white border border-gray-200 rounded-md shadow-sm p-4 hover:shadow-md transition duration-150 ease-in-out transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(product)}
    >
      <img
        src={imageSrc}
        alt={product.name || "Product image"}
        className="w-full h-48 object-cover rounded-md mb-3"
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
