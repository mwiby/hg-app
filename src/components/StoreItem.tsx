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

  const handleClick = () => {
    if (store.website) {
      window.open(store.website, "_blank", "noopener,noreferrer");
    } else {
      onClick(store);
    }
  };

  return (
    <li
      className={`relative bg-gray-100 border ${
        store.website ? "hover:border-blue-500" : "hover:border-gray-400"
      } rounded-lg shadow-md p-6 transition duration-200 ease-in-out transform ${
        store.website ? "hover:-translate-y-1 hover:shadow-lg" : ""
      }`}
      onClick={handleClick}
      style={{ cursor: store.website ? "pointer" : "default", listStyle: "none"}}
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
        <a
          href={store.website}
          target="_blank"
          rel="noopener noreferrer"
          title="Go to store website"
          className="absolute bottom-3 right-3 text-xs text-white bg-blue-500 px-3 py-1 rounded-full shadow-sm hover:bg-blue-600 hover:shadow-md transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Last nettside
        </a>

      ) : (
      <p className="absolute bottom-3 right-3 text-xs text-gray-500">
        Ingen nettside tilgjengelig
      </p>
      )}
    </li>
  );
};

export default StoreItem;
