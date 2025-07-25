// src/components/CoinTable.js
import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { FaArrowUp, FaArrowDown, FaSearch } from 'react-icons/fa';
import { Form, Table, Row, Col } from 'react-bootstrap';
import bitcoinLogo from '../assets/img/bitcoins.gif'; // ensure image exists

const CoinTable = ({ coins }) => {
  const [search, setSearch] = useState('');

  const filteredCoins = useMemo(() => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, coins]);

  const columns = useMemo(
    () => [
      {
        Header: 'Rank',
        accessor: 'id',
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );

  return (
    <div>
      <Row className="align-items-center g-3 mb-3">
        <Col xs={12} md={6} className="d-flex align-items-center gap-2">
          <img src={bitcoinLogo} alt="Bitcoin" width={30} height={30} className="rotating-logo" />
          <h5 className="fw-bold mb-0 live-title">Live Cryptocurrencies Tracker</h5>
        </Col>
        <Col xs={12} md={6} className="position-relative">
          <Form.Control
            type="text"
            placeholder="Search coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-pill shadow-sm"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: '1px solid #fff',
              paddingRight: '2rem',
            }}
          />
          <FaSearch
            style={{
              position: 'absolute',
              top: '50%',
              right: '20px',
              transform: 'translateY(-50%)',
              color: '#ff971d',
            }}
          />
        </Col>
      </Row>

      <Table {...getTableProps()} responsive hover bordered className="align-middle shadow-sm">
        <thead className="table-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ cursor: 'pointer' }}
                >
                  {column.render('Header')}
                  <span className="ms-1">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaArrowDown size={12} />
                      ) : (
                        <FaArrowUp size={12} />
                      )
                    ) : (
                      <FaArrowDown size={12} style={{ opacity: 0.5 }} />
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
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default CoinTable;
