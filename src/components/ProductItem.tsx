import React from "react";
import { ProductItemProps } from "../types/dataTypes";

const ProductItem: React.FC<ProductItemProps> = ({ product, onClick }) => {
  const fallbackImage =
    "https://dummyimage.com/150x150/cccccc/000000%26text=No+Image";

  const findLastPriceChange = () => {
    if (!product.price_history || product.price_history.length === 0) {
      return null;
    }

    const history = product.price_history.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const lastChange = history[0].price;

    for (let i = 1; i < history.length; i++) {
      if (history[i].price !== lastChange) {
        return history[i].price;
      }
    }

    return null;
  };

  const lastChangedPrice = findLastPriceChange();

  const getPriceChange = () => {
    if (lastChangedPrice === null || lastChangedPrice === undefined) return null;
    if (product.current_price > lastChangedPrice) return "up";
    if (product.current_price < lastChangedPrice) return "down";
    return "no-change";
  };

  const priceChange = getPriceChange();
  const priceDifference = lastChangedPrice
    ? Math.abs(product.current_price - lastChangedPrice).toFixed(2)
    : null;

  return (
    <li
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(product)}
    >
      <img
        src={product.image}
        alt={product.name || "Product image"}
        className="w-full h-48 object-cover rounded-lg mb-3"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackImage;
        }}
      />
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800 truncate max-w-[70%]">{product.name}</h2>
        {priceChange && lastChangedPrice !== null && (
          <span
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
              priceChange === "up"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {priceChange === "up" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                +{priceDifference} kr
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                -{priceDifference} kr
              </>
            )}
          </span>
        )}
      </div>
      <p className="text-md text-blue-600 font-semibold mb-2">
        Pris: {product.current_price} kr
      </p>
      <p className="text-sm text-gray-500 mb-1">Leverandør: {product.vendor}</p>
      <p className="text-sm text-gray-600">
        Butikk:{" "}
        <span className="font-medium">
          {product.store?.name || "Ukjent butikk"}
        </span>
      </p>
    </li>
  );
};

export default ProductItem;


