import { ProductModalProps } from "../types/dataTypes";

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/3 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-blue-600 text-lg font-medium mb-4">Pris: {product.current_price}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-600">
              <strong>Leverandør:</strong> {product.vendor}
            </p>
            <p className="text-gray-600">
              <strong>Merke:</strong> {product.brand}
            </p>
            <p className="text-gray-600">
              <strong>Butikk:</strong> {product.store.name}
            </p>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-blue-500 underline"
            >
              Se produkt i butikk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
