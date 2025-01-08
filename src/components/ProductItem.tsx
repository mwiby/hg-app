import React from "react";
import { ProductItemProps } from "../types/dataTypes";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/solid";

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
      <p className="text-md text-blue-600 font-semibold mb-1">
        Pris: {product.current_price} kr
        {priceChange === "up" && lastChangedPrice !== null && (
          <span className="text-red-600 ml-2 flex items-center">
            <ArrowUpIcon className="h-5 w-5 mr-1" />
            +{(product.current_price - lastChangedPrice).toFixed(2)} kr
          </span>
        )}
        {priceChange === "down" && lastChangedPrice !== null && (
          <span className="text-green-600 ml-2 flex items-center">
            <ArrowDownIcon className="h-5 w-5 mr-1" />
            -{(lastChangedPrice - product.current_price).toFixed(2)} kr
          </span>
        )}
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
