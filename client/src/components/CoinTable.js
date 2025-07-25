import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { FaArrowUp, FaArrowDown, FaSearch } from 'react-icons/fa';
import { Form, Table } from 'react-bootstrap';

const CoinTable = ({ coins }) => {
  const [search, setSearch] = useState('');

  // Filter coins based on the search query (client-side filtering)
  const filteredCoins = useMemo(() => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, coins]);

  // Define columns for react-table
  const columns = useMemo(
    () => [
      {
        Header: 'Rank',
        accessor: 'id', // Use the coin ID to calculate rank
        Cell: ({ row }) => `#${row.index + 1}`,
      },
      {
        Header: 'Coin',
        accessor: 'name',
        Cell: ({ row }) => (
          <div className="d-flex align-items-center gap-2">
            <img src={row.original.image} alt={row.original.name} width="24" height="24" />
            <span>{row.original.name}</span>
          </div>
        ),
      },
      {
        Header: 'Price (USD)',
        accessor: 'current_price',
        Cell: ({ value }) => `$${value.toLocaleString()}`,
      },
      {
        Header: 'Market Cap',
        accessor: 'market_cap',
        Cell: ({ value }) => `$${value.toLocaleString()}`,
      },
      {
        Header: '24h Change',
        accessor: 'price_change_percentage_24h',
        Cell: ({ value }) => (
          <span className={value < 0 ? 'text-danger' : 'text-success'}>
            {value?.toFixed(2)}%
          </span>
        ),
      },
      {
        Header: 'Last Updated',
        accessor: 'timestamp',
        Cell: () => new Date().toLocaleString(),
      },
    ],
    []
  );

  const data = useMemo(() => filteredCoins, [filteredCoins]);

  // Use react-table hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // Use filter functionality
    useSortBy // Use sort functionality
  );

  return (
    <div>
      {/* Search Input */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Latest Cryptocurrencies</h5>
        <div className="input-container" style={{ maxWidth: '300px', position: 'relative' }}>
          <Form.Control
            type="text"
            placeholder="Search coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-pill shadow-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background
              color: '#fff', // Text color for the input
              border: '1px solid #fff',
            }}
          />
          {/* Search Icon inside the input box */}
          <FaSearch
            className="input-icon"
            size={16}
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              color: '#fff',
            }}
          />
        </div>
      </div>

      {/* Table with react-table functionalities */}
      <Table
        {...getTableProps()}
        responsive
        hover
        bordered
        className="align-middle shadow-sm"
      >
        <thead className="table-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="sortable-column"
                  style={{ cursor: 'pointer' }}
                >
                  {column.render('Header')}
                  {/* Display sorting arrow */}
                  <span style={{ marginLeft: '5px' }}>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaArrowDown size={12} />
                      ) : (
                        <FaArrowUp size={12} />
                      )
                    ) : (
                      <FaArrowDown size={12} style={{ opacity: 0.5 }} /> // Show a default down arrow
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default CoinTable;
