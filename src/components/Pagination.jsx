import React from 'react';

function Pagination({ pageNumProp, onNextProp, onPrevProp }) {
  return (
    <div className='flex justify-center my-4'>
      <button
        onClick={onPrevProp}
        className='border-2 border-l-2 border-blue-400 px-4 py-2 rounded-l-xl cursor-pointer hover:bg-blue-500 hover:text-white'
        aria-label="Previous page"
      >
        Previous
      </button>

      <div className='border-t-2 border-b-2 border-blue-400 px-4 py-2'>
        {pageNumProp}
      </div>

      <button
        onClick={onNextProp}
        className='border-2 border-blue-400 px-4 py-2 rounded-r-xl cursor-pointer hover:bg-blue-500 hover:text-white'
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
