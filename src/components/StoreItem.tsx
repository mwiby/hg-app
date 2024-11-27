import { StoreItemProps } from "../types/dataTypes";

const StoreItem: React.FC<StoreItemProps> = ({ store, onClick }) => {
  const openingHoursText = `
    Man: ${store.openingHours.monday || "Stengt"}, 
    Tir: ${store.openingHours.tuesday || "Stengt"}, 
    Ons: ${store.openingHours.wednesday || "Stengt"}, 
    Tor: ${store.openingHours.thursday || "Stengt"}, 
    Fre: ${store.openingHours.friday || "Stengt"}, 
    Lør: ${store.openingHours.saturday || "Stengt"}, 
    Søn: ${store.openingHours.sunday || "Stengt"}
  `;

  const handleClick = () =>
    store.website ? (window.location.href = store.website) : onClick(store);

  return (
    <li
      className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 cursor-pointer"
      onClick={handleClick}
    >
      {/* Store Logo */}
      <img
        src={store.logo}
        alt={store.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />

      {/* Store Name */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{store.name}</h2>

      {/* Address */}
      <p className="text-sm text-gray-700 mb-2">
        <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
        {store.address}
      </p>

      {/* Phone */}
      <p className="text-sm text-gray-700 mb-2">
        <i className="fas fa-phone mr-2 text-green-600"></i>
        Telefon: {store.phone}
      </p>

      {/* Opening Hours */}
      <div className="bg-gray-200 text-gray-800 text-sm rounded-md p-3 mt-3">
        <b>Åpningstider:</b> {openingHoursText.trim()}
      </div>
    </li>
  );
};

export default StoreItem;
