import React from "react";

function Pagination({
  items,
  currentPage,
  pageSize,
  totalPages,
  totalItems,
  handlePageChange,
}: {
  items: any[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  handlePageChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 justify-end p-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-45"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-45"
        >
          Next
        </button>
      </div>
      <div>|</div>
      <div>
        {" "}
        {totalItems} {totalItems > 1 ? "items" : "item"}
      </div>
    </div>
  );
}

export default Pagination;
