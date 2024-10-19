// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, pageSize, totalRecords, onPageChange }) => {
  // Ensure totalRecords is valid
  const validTotalRecords = totalRecords >= 0 ? totalRecords : 0;

  // Calculate start and end index
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, validTotalRecords);

  // Calculate total pages
  const totalPages = Math.ceil(validTotalRecords / pageSize);

  return (
    <div className="pagination flex flex-wrap">
      <p>
        {start} - {end} of {validTotalRecords} records
      </p>
      {/* Page numbers */}
      <div>
        {totalPages > 0 &&
          [...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page + 1)}
              disabled={currentPage === page + 1} // Disable current page button
              className={`page-button rounded-md ${currentPage == page + 1 ? 'active' : ''}`} // Apply active class
            >
              {page + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Pagination;
