import {PaginationProps} from "../types/dataTypes"

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages.map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`px-3 py-1 mx-1 rounded-lg ${
          page === currentPage
            ? "bg-blue-500 text-white font-bold"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
      >
        Previous
      </button>
      <div className="flex">{renderPageNumbers()}</div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;