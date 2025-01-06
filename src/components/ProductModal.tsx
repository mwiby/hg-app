import { useEffect, useRef } from "react";
import { ProductModalProps } from "../types/dataTypes";

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const fallbackImage = "https://dummyimage.com/150x150/cccccc/000000%26text=No+Image";

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col space-y-4">
          <img
            src={product.image}
            alt={product.name || "Product image"}
            className="w-full h-64 object-cover rounded-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-blue-600 text-lg font-medium mb-4">Pris: {product.current_price} kr</p>
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
