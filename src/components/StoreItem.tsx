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
      className={`relative bg-gray-100 border ${
        store.website ? "hover:border-blue-500" : "hover:border-gray-400"
      } rounded-lg shadow-md p-6 transition duration-200 ease-in-out transform ${
        store.website ? "hover:-translate-y-1 hover:shadow-lg" : ""
      }`}
      onClick={handleClick}
      style={{ cursor: store.website ? "pointer" : "default" }}
    >

      <img
        src={store.logo}
        alt={store.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />

      <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
        {store.name}
        {store.website && (
          <span
            title="Click to visit website"
            className="ml-2 text-blue-500 text-sm"
          >
            <i className="fas fa-external-link-alt"></i>
          </span>
        )}
      </h2>

      <p className="text-sm text-gray-700 mb-2">
        <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
        {store.address}
      </p>

      <p className="text-sm text-gray-700 mb-2">
        <i className="fas fa-phone mr-2 text-green-600"></i>
        Telefon: {store.phone}
      </p>

      <div className="bg-gray-200 text-gray-800 text-sm rounded-md p-3 mt-3">
        <b>Åpningstider:</b> {openingHoursText.trim()}
      </div>

      {store.website ? (
        <p className="absolute bottom-3 right-3 text-xs text-blue-500">
          Klikk - Nettsted
        </p>
      ) : (
        <p className="absolute bottom-3 right-3 text-xs text-gray-500">
          Ingen nettside tilgjengelig
        </p>
      )}
    </li>
  );
};

export default StoreItem;
