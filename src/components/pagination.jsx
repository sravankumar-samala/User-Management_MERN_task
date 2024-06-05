/* eslint-disable react/prop-types */
import { ChevronsLeft, ChevronsRight } from "lucide-react";
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
        <ChevronsLeft /> Prev
      </button>
      <span>
        <span className="current-page">{currentPage}</span> of {totalPages}
      </span>
      <button
        type="button"
        onClick={goToNextPage}
        disabled={currentPage >= totalPages}
      >
        Next <ChevronsRight />
      </button>
    </div>
  );
}
