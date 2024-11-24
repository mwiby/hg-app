import { StoreItemProps } from "../types/dataTypes";

const StoreItem: React.FC<StoreItemProps> = ({ store, onClick }) => {
  return (
    <li
      className="bg-white border border-gray-200 rounded-md shadow-sm p-4 hover:shadow-md transition duration-150 ease-in-out transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(store)}
    >
      <img
        src={store.logo}
        alt={store.name}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <h2 className="text-lg font-medium text-gray-800">{store.name}</h2>
      <p className="text-sm text-gray-500 mb-1">{store.address}</p>
      <p className="text-sm text-gray-500 mb-1">Phone: {store.phone}</p>
      <p className="text-sm text-gray-500 mb-1">
        Opening hours: {store.openingHours.monday || "Closed"}
      </p>
    </li>
  );
};

export default StoreItem;
