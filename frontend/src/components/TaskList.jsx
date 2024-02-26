import React from 'react';

const TaskList = ({ tasks, currentPage, totalPages, onPageChange }) => {
    console.log("currentPage:", currentPage);
  console.log("totalPages:", totalPages);
  return (
    <div>
     
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
