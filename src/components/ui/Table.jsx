import React, { useEffect, useState } from 'react';
import { HiOutlineArrowDown, HiOutlineArrowUp, HiSearch } from 'react-icons/hi';

const Table = ({
  data = [],
  columns = [],
  onRowClick,
  searchPlaceholder = 'Search...',
  pageSize = 10,
  isLoading = false,
  emptyMessage = 'No items to display',
  striped = false,
  hoverable = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize filtered data on mount and when data, columns, or searchTerm change
  useEffect(() => {
    if (!searchTerm.trim()) {
      // If no search term, use the full data set
      setFilteredData(data);
      return;
    }

    // Apply search filter if we have a search term
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = data.filter((item) => {
      return columns.some((column) => {
        const value = item[column.field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchTermLower);
      });
    });

    setFilteredData(filtered);
    // Reset to first page when search results change
    setCurrentPage(1);
  }, [data, columns, searchTerm]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sorted data
  const getSortedData = () => {
    if (!sortField) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      // Handle undefined or null values
      if (valueA === undefined || valueA === null) return sortDirection === 'asc' ? -1 : 1;
      if (valueB === undefined || valueB === null) return sortDirection === 'asc' ? 1 : -1;

      // Compare strings
      if (typeof valueA === 'string') {
        return sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Compare numbers or other values
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = getSortedData().slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Render sort icon
  const renderSortIcon = (field) => {
    if (sortField !== field) return null;

    return sortDirection === 'asc' ? (
      <HiOutlineArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <HiOutlineArrowDown className="ml-1 h-4 w-4" />
    );
  };

  // Ensure columns is an array
  const safeColumns = Array.isArray(columns) ? columns : [];

  return (
    <div className="overflow-x-auto">
      {/* Search Input */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <HiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              {safeColumns.map((column) => (
                <th
                  key={column.field}
                  scope="col"
                  className={`px-6 py-3 ${column.sortable !== false ? 'cursor-pointer select-none' : ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.field)}
                >
                  <div className="flex items-center">
                    {column.headerName || column.field}
                    {column.sortable !== false && renderSortIcon(column.field)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                <td colSpan={safeColumns.length} className="text-center px-6 py-4">
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                <td colSpan={safeColumns.length} className="text-center px-6 py-4">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`
                    ${striped && rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : ''}
                    ${striped && rowIndex % 2 === 1 ? 'bg-gray-50 dark:bg-gray-700' : ''}
                    ${!striped ? 'bg-white dark:bg-gray-800' : ''}
                    border-b dark:border-gray-700
                    ${hoverable ? 'hover:bg-gray-50 dark:hover:bg-gray-600' : ''}
                    ${onRowClick ? 'cursor-pointer' : ''}
                  `}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {safeColumns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 ${colIndex === 0 ? 'whitespace-nowrap font-medium text-gray-900 dark:text-white' : ''}`}
                    >
                      {column.cellRenderer ? column.cellRenderer(row) : row[column.field]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-4 flex-wrap gap-2">
          {/* Previous */}
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md transition ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
            }`}
          >
            Previous
          </button>

          {/* Pages */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1),
            )
            .reduce((acc, page, index, arr) => {
              if (index > 0 && page - arr[index - 1] > 1) acc.push('ellipsis');
              acc.push(page);
              return acc;
            }, [])
            .map((page, i) =>
              page === 'ellipsis' ? (
                <span key={`ellipsis-${i}`} className="px-3 py-1 text-gray-500 dark:text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 rounded-md transition ${
                    currentPage === page
                      ? 'bg-blue-600 text-white cursor-default dark:bg-blue-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
                  }`}
                >
                  {page}
                </button>
              ),
            )}

          {/* Next */}
          <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md transition ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
