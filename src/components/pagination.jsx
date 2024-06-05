/* eslint-disable react/prop-types */
import "../styles/pagination.css";

export default function Pagination({ currentPage, totalPages, changePage }) {
  const goToNextPage = () => {
    if (currentPage < totalPages) changePage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) changePage(currentPage - 1);
  };

  return (
    <div className="pagination-container">
      <button
        type="button"
        onClick={goToPreviousPage}
        disabled={currentPage <= 1}
      >
        Prev
      </button>
      <p>
        {currentPage}/{totalPages}
      </p>
      <button
        type="button"
        onClick={goToNextPage}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
