import { PaginationProps } from "../types/dataTypes";

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
      >
        Forrige
      </button>
      <span className="text-gray-700 font-medium">
        Side {currentPage} av {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
      >
        Neste
      </button>
    </div>
  );
};

export default Pagination;
